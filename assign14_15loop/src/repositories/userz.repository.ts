import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customerz, Roles, Userz, UserzRelations} from '../models';
import {CustomerzRepository} from './customerz.repository';
import {RolesRepository} from './roles.repository';
export type Credentials={
  email:string,
  password:string
}
export class UserzRepository extends DefaultCrudRepository<
  Userz,
  typeof Userz.prototype.id,
  UserzRelations
> {

  public readonly customerz: BelongsToAccessor<Customerz, typeof Userz.prototype.id>;

  public readonly roles: BelongsToAccessor<Roles, typeof Userz.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CustomerzRepository') protected customerzRepositoryGetter: Getter<CustomerzRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Userz, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.customerz = this.createBelongsToAccessorFor('customerz', customerzRepositoryGetter,);
    this.registerInclusionResolver('customerz', this.customerz.inclusionResolver);
  }
}
