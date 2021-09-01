import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permissions} from 'loopback4-authorization';
import {Userz} from './userz.model';
@model()
export class Roles extends Entity implements Permissions<string> {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  key: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  permissions: string[];


  @hasMany(() => Userz, {keyTo: 'role'})
  userzs: Userz[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
