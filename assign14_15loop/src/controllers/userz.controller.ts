//
import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
//import { User } from '../models';
//import { Credentials, UserRepository } from '../repositories';
import * as _ from 'lodash';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../authorization/permission.enum';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {Userz} from '../models';
import {Credentials, UserzRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.passport.bcrypt';
import {JWTService} from '../services/jwt.service';
import {MyUserService} from '../services/User.service';
import {validateCredentials} from '../services/validator.service';
import {CredentialsRequestBody} from './specs/userz.controller.spec';
export class UserzController {

  constructor(@inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: JWTService,
    @repository(UserzRepository)
    public userzRepository: UserzRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE) public myCustomUserService: MyUserService
  ) { }

  // @authorize({permissions: [PermissionKey.SignUp]})
  @post('/userzs/signup', {
    responses: {
      '200': {
        description: "User",
        content: {'application/json': {schema: getModelSchemaRef(Userz)}},
      }

    }
  })
  @authorize({permissions: [PermissionKey.SignUp]})
  async signUp(@requestBody() userData: Userz) {

    //lodash package provide pick method
    validateCredentials(_.pick(userData, ['email', 'password']))
    //encrypt password
    userData.password = await this.hasher.hashPassword(userData.password)
    const savedUser = await this.userzRepository.create(userData)
    // delete savedUser.password; - doesn't work because savedUser is of type user and user has passowrd as required
    const userValuesToReturn = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      middleName: savedUser.middleName,
      lastName: savedUser.lastName,
      phoneNumber: savedUser.phoneNumber,
      email: savedUser.email,
      customerId: savedUser.customerzId,
      role: savedUser.role
    }
    return userValuesToReturn;
  }

  @authorize({permissions: [PermissionKey.LogIn]})

  @post('/userzs/login', {
    responses: {
      '200': {
        description: "Token",
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        },
      }

    }
  })

  async login(@requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{token: string}> {

    //check if user is valid
    const user = await this.myCustomUserService.verifyCredentials(credentials)
    const userProfile = this.myCustomUserService.convertToUserProfile(user)
    //generate token
    const token = await this.jwtService.generateToken(userProfile)
    return {token: token}
  }

  @post('/userzs')
  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.AddUsers]})
  @response(200, {
    description: 'Userz model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userz)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {
            title: 'NewUserz',

          }),
        },
      },
    })
    userz: Userz,
  ): Promise<Userz> {
    return this.userzRepository.create(userz);
  }

  @get('/userzs/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Userz model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Userz) where?: Where<Userz>,
  ): Promise<Count> {
    return this.userzRepository.count(where);
  }

  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.ViewUsers]})
  @get('/userzs')

  @response(200, {
    description: 'Array of Userz model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Userz, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Userz) filter?: Filter<Userz>,
  ): Promise<Userz[]> {
    return this.userzRepository.find({include: ['customerz', 'roles']});
  }

  @patch('/userzs')
  @authenticate('jwt')
  @response(200, {
    description: 'Userz PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {partial: true}),
        },
      },
    })
    userz: Userz,
    @param.where(Userz) where?: Where<Userz>,
  ): Promise<Count> {
    return this.userzRepository.updateAll(userz, where);
  }

  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.ViewUsers]})
  @get('/userzs/{id}')
  @response(200, {
    description: 'Userz model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userz, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Userz, {exclude: 'where'}) filter?: FilterExcludingWhere<Userz>
  ): Promise<Userz> {
    return this.userzRepository.findById(id, {include: ['customerz', 'roles']});
  }

  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.UpdateUsers]})
  @patch('/userzs/{id}')
  @response(204, {
    description: 'Userz PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {partial: true}),
        },
      },
    })
    userz: Userz,
  ): Promise<void> {
    await this.userzRepository.updateById(id, userz);
  }

  @put('/userzs/{id}')
  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.UpdateUsers]})
  @response(204, {
    description: 'Userz PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userz: Userz,
  ): Promise<void> {
    await this.userzRepository.replaceById(id, userz);
  }

  @authenticate('jwt')
  @authorize({permissions: [PermissionKey.DeleteUsers]})
  @del('/userzs/{id}')

  @response(204, {
    description: 'Userz DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userzRepository.deleteById(id);
  }
}
