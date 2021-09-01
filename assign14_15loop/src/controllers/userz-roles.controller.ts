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
  Roles,
} from '../models';
import {UserzRepository} from '../repositories';

export class UserzRolesController {
  constructor(
    @repository(UserzRepository)
    public userzRepository: UserzRepository,
  ) { }

  @get('/userzs/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Userz',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Userz.prototype.id,
  ): Promise<Roles> {
    return this.userzRepository.roles(id);
  }
}
