import {Entity, model, property, hasMany} from '@loopback/repository';
import {Userz} from './userz.model';

@model()
export class Customerz extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  website: string;

  @hasMany(() => Userz)
  userzs: Userz[];

  constructor(data?: Partial<Customerz>) {
    super(data);
  }
}

export interface CustomerzRelations {
  // describe navigational properties here
}

export type CustomerzWithRelations = Customerz & CustomerzRelations;
