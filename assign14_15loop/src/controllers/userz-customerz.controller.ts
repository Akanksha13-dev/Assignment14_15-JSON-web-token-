import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Userz,
  Customerz,
} from '../models';
import {UserzRepository} from '../repositories';

export class UserzCustomerzController {
  constructor(
    @repository(UserzRepository)
    public userzRepository: UserzRepository,
  ) { }

  @get('/userzs/{id}/customerz', {
    responses: {
      '200': {
        description: 'Customerz belonging to Userz',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customerz)},
          },
        },
      },
    },
  })
  async getCustomerz(
    @param.path.number('id') id: typeof Userz.prototype.id,
  ): Promise<Customerz> {
    return this.userzRepository.customerz(id);
  }
}
