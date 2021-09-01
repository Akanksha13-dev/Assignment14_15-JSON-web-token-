import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Roles,
  Userz,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesUserzController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/userzs', {
    responses: {
      '200': {
        description: 'Array of Roles has many Userz',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Userz)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Userz>,
  ): Promise<Userz[]> {
    return this.rolesRepository.userzs(id).find(filter);
  }

  @post('/roles/{id}/userzs', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userz)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roles.prototype.key,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {
            title: 'NewUserzInRoles',
            exclude: ['id'],
            optional: ['role']
          }),
        },
      },
    }) userz: Omit<Userz, 'id'>,
  ): Promise<Userz> {
    return this.rolesRepository.userzs(id).create(userz);
  }

  @patch('/roles/{id}/userzs', {
    responses: {
      '200': {
        description: 'Roles.Userz PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {partial: true}),
        },
      },
    })
    userz: Partial<Userz>,
    @param.query.object('where', getWhereSchemaFor(Userz)) where?: Where<Userz>,
  ): Promise<Count> {
    return this.rolesRepository.userzs(id).patch(userz, where);
  }

  @del('/roles/{id}/userzs', {
    responses: {
      '200': {
        description: 'Roles.Userz DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Userz)) where?: Where<Userz>,
  ): Promise<Count> {
    return this.rolesRepository.userzs(id).delete(where);
  }
}
