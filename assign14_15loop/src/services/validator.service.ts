// import {injectable, /* inject, */ BindingScope} from '@loopback/core';

// @injectable({scope: BindingScope.TRANSIENT})
// export class ValidatorService {
//   constructor(/* Add @inject to inject parameters */) {}

//   /*
//    * Add service methods here
//    */
// }
import {HttpErrors} from '@loopback/rest';
import * as IsEmail from 'isemail';
import {Credentials} from '../repositories';

export function validateCredentials(credentials:Credentials){

    if(!IsEmail.validate(credentials.email))
    {
        throw new HttpErrors.UnprocessableEntity('Invalid Email');
    }
    if(credentials.password.length<8)
    {
        throw new HttpErrors.UnprocessableEntity('Password Length should be greater than 8');
    }

}
