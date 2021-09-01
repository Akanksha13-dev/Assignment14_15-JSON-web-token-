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
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../authorization/permission.enum';
import {Customerz} from '../models';
import {CustomerzRepository} from '../repositories';
export class CustomerzController {
  constructor(
    @repository(CustomerzRepository)
    public customerzRepository: CustomerzRepository,
  ) { }

  @authorize({permissions: [PermissionKey.CreateCustomers]})
  @post('/customerzs')
  @response(200, {
    description: 'Customerz model instance',
    content: {'application/json': {schema: getModelSchemaRef(Customerz)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerz, {
            title: 'NewCustomerz',

          }),
        },
      },
    })
    customerz: Customerz,
  ): Promise<Customerz> {
    return this.customerzRepository.create(customerz);
  }

  @get('/customerzs/count')
  @response(200, {
    description: 'Customerz model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Customerz) where?: Where<Customerz>,
  ): Promise<Count> {
    return this.customerzRepository.count(where);
  }
  @authorize({permissions: [PermissionKey.ViewCustomers]})
  @get('/customerzs')
  @response(200, {
    description: 'Array of Customerz model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Customerz, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Customerz) filter?: Filter<Customerz>,
  ): Promise<Customerz[]> {
    return this.customerzRepository.find({include: ['userzs']});
  }

  @patch('/customerzs')
  @response(200, {
    description: 'Customerz PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerz, {partial: true}),
        },
      },
    })
    customerz: Customerz,
    @param.where(Customerz) where?: Where<Customerz>,
  ): Promise<Count> {
    return this.customerzRepository.updateAll(customerz, where);
  }
  @authorize({permissions: [PermissionKey.ViewCustomers]})
  @get('/customerzs/{id}')
  @response(200, {
    description: 'Customerz model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Customerz, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Customerz, {exclude: 'where'}) filter?: FilterExcludingWhere<Customerz>
  ): Promise<Customerz> {
    return this.customerzRepository.findById(id, {include: ['userzs']});
  }

  @patch('/customerzs/{id}')
  @response(204, {
    description: 'Customerz PATCH success',
  })
  @authorize({permissions: [PermissionKey.UpdateCustomers]})
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerz, {partial: true}),
        },
      },
    })
    customerz: Customerz,
  ): Promise<void> {
    await this.customerzRepository.updateById(id, customerz);
  }
  @authorize({permissions: [PermissionKey.UpdateCustomers]})
  @put('/customerzs/{id}')
  @response(204, {
    description: 'Customerz PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customerz: Customerz,
  ): Promise<void> {
    await this.customerzRepository.replaceById(id, customerz);
  }
  @authorize({permissions: [PermissionKey.DeleteCustomers]})
  @del('/customerzs/{id}')
  @response(204, {
    description: 'Customerz DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customerzRepository.deleteById(id);
  }
}
