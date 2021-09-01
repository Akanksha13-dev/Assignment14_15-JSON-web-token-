/* eslint-disable eqeqeq */

import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {
    FindRoute, HttpErrors, InvokeMethod, ParseParams,
    Reject, RequestContext, Send, SequenceActions,
    SequenceHandler
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {
    AuthorizationBindings, AuthorizeErrorKeys, AuthorizeFn
} from 'loopback4-authorization';
import {PermissionKey} from './authorization/permission.enum';
import {TokenServiceBindings, UserServiceBindings} from './keys';
import {Roles, Userz} from './models';
import {RolesRepository, UserzRepository} from './repositories';
import {JWTService} from './services/jwt.service';
import {MyUserService} from './services/User.service';
//import { PermissionKey } from './authorization/permission.enum';

//const SequenceActions=RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
    constructor(
        @inject(SequenceActions.FIND_ROUTE)
        protected findRoute: FindRoute,
        @inject(SequenceActions.PARSE_PARAMS)
        protected parseParams: ParseParams,
        @inject(SequenceActions.INVOKE_METHOD)
        protected invoke: InvokeMethod,
        @inject(SequenceActions.SEND) public send: Send,
        @inject(SequenceActions.REJECT) public reject: Reject,
        @repository(UserzRepository) protected userRepository: UserzRepository,
        @repository(RolesRepository) protected roleRepository: RolesRepository,
        @inject(AuthorizationBindings.AUTHORIZE_ACTION)
        protected checkAuthorisation: AuthorizeFn,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: MyUserService,
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: JWTService,
    ) { }

    async handle(context: RequestContext) {
        try {
            const {request, response} = context;


            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "*");
            //response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");


            const route = this.findRoute(request);
            //
            //console.log(request);
            const args = await this.parseParams(request, route);
            //console.log(args);
            request.body = args[args.length - 1];
            //console.log(request.body);

            //Giving each user permission to signup and login

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let permissions: string[] = [PermissionKey.SignUp, PermissionKey.LogIn];


            if (request.method === "OPTIONS") {

                response.status(200);
                this.send(response, 'ok');
            }

            if (request.headers.authorization) {

                //firstly get token from request(header)
                const userToken = request.headers.authorization.split(" ")[1];

                //convert token to Userprofile to fetch user id
                const userProfile: UserProfile = await this.jwtService.verifyToken(userToken);

                //Fetching  user with that user id
                const user: Userz = await this.userRepository.findById(userProfile.id);
                // user permission are fetched
                const role: Roles = await this.roleRepository.findById(user.role);

                if (role.permissions.length > 0) {
                    permissions = [...permissions, ...(role.permissions)]
                }



            }


            const isAccessAllowed: boolean = await this.checkAuthorisation(
                permissions,
                request,
            );


            if (!isAccessAllowed) {

                throw new HttpErrors.Forbidden(AuthorizeErrorKeys.NotAllowedAccess);
            }

            const result = await this.invoke(route, args);

            this.send(response, result);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            this.reject(context, error);
        }
    }

}



