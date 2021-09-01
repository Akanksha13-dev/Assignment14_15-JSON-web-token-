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
  Customerz,
  Userz,
} from '../models';
import {CustomerzRepository} from '../repositories';

export class CustomerzUserzController {
  constructor(
    @repository(CustomerzRepository) protected customerzRepository: CustomerzRepository,
  ) { }

  @get('/customerzs/{id}/userzs', {
    responses: {
      '200': {
        description: 'Array of Customerz has many Userz',
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
    return this.customerzRepository.userzs(id).find(filter);
  }

  @post('/customerzs/{id}/userzs', {
    responses: {
      '200': {
        description: 'Customerz model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userz)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customerz.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userz, {
            title: 'NewUserzInCustomerz',
            exclude: ['id'],
            optional: ['customerzId']
          }),
        },
      },
    }) userz: Omit<Userz, 'id'>,
  ): Promise<Userz> {
    return this.customerzRepository.userzs(id).create(userz);
  }

  @patch('/customerzs/{id}/userzs', {
    responses: {
      '200': {
        description: 'Customerz.Userz PATCH success count',
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
    return this.customerzRepository.userzs(id).patch(userz, where);
  }

  @del('/customerzs/{id}/userzs', {
    responses: {
      '200': {
        description: 'Customerz.Userz DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Userz)) where?: Where<Userz>,
  ): Promise<Count> {
    return this.customerzRepository.userzs(id).delete(where);
  }
}
