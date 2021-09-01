//import { JWTService } from "./services/jwt.service"
import {TokenService, UserService} from '@loopback/authentication'
import {BindingKey} from "@loopback/core"
import {Userz} from "./models/userz.model"
import {Credentials} from "./repositories/userz.repository"
import {PasswordHasher} from "./services/hash.passport.bcrypt"

export namespace TokenServiceConstants{
    export const TOKEN_SECRET_VALUE='12345678abc'
    export const TOKEN_EXPIRES_IN='7h'
}

export namespace TokenServiceBindings{
    export const TOKEN_SECRET=BindingKey.create<string>('authentication.jwt.secret')
    export const TOKEN_EXPIRES_IN=BindingKey.create<string>('authentication.jwt.expiresIn')
    export const TOKEN_SERVICE=BindingKey.create<TokenService>('services.jwt.service')

}

export namespace PasswordHasherBindings{
    export const PASSWORD_HASHER=BindingKey.create<PasswordHasher>('service.hasher')
    export const ROUNDS=BindingKey.create<number>('rounds')
}
export namespace UserServiceBindings{
      export const USER_SERVICE=BindingKey.create<UserService<Userz, Credentials>>('services.user.service')

}
