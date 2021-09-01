import {belongsTo, Entity, model, property} from '@loopback/repository';
//import {IAuthUser} from 'loopback4-authentication';
import {Customerz} from './customerz.model';
import {Roles} from './roles.model';

@model()
export class Userz extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    name: 'id'
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'firstname',
  })
  firstName: string;

  @property({
    type: 'string',
    required: false,
    name: 'middlename',
  })
  middleName: string;

  @property({
    type: 'string',
    required: true,
    name: 'lastname',
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    name: 'email',
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    name: 'phonenumber',
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
    name: 'address',
  })
  address: string;

  @property({
    type: 'date',
    required: true,
    name: 'datetime',
  })
  datetime: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => Customerz)
  customerzId: number;

  @belongsTo(() => Roles, {name: 'roles'})
  role: number;

  constructor(data?: Partial<Userz>) {
    super(data);
  }
}

export interface UserzRelations {
  // describe navigational properties here
}

export type UserzWithRelations = Userz & UserzRelations;
