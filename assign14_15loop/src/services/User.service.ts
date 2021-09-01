import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {Userz} from '../models/userz.model';
import {Credentials, UserzRepository} from '../repositories/userz.repository';
import {BcryptHasher} from './hash.passport.bcrypt';

export class MyUserService implements UserService<Userz, Credentials>{

    constructor(@repository(UserzRepository) public userRepository: UserzRepository, @inject(PasswordHasherBindings.PASSWORD_HASHER) public hasher: BcryptHasher
    ) {

    }
    async verifyCredentials(credentials: Credentials): Promise<Userz> {
        const foundUser = await this.userRepository.findOne({
            where: {
                email: credentials.email
            }
        })
        if (!foundUser) {
            throw new HttpErrors.NotFound(`No user with this email ${credentials.email} `)
        }
        const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password)
        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized("Password is not Valid");
        }
        return foundUser
    }
    convertToUserProfile(user: Userz): UserProfile {
        const profileName = user.firstName + user.middleName + user.lastName;
        return {
            id: user.id,
            [securityId]: `${user.id}`,
            name: profileName
        }

    }



}
