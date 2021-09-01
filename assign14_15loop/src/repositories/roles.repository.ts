import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Roles, RolesRelations, Userz} from '../models';
import {UserzRepository} from './userz.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.key,
  RolesRelations
> {

  public readonly userzs: HasManyRepositoryFactory<Userz, typeof Roles.prototype.key>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserzRepository') protected userzRepositoryGetter: Getter<UserzRepository>,
  ) {
    super(Roles, dataSource);
    this.userzs = this.createHasManyRepositoryFactoryFor('userzs', userzRepositoryGetter,);
    this.registerInclusionResolver('userzs', this.userzs.inclusionResolver);
  }
}
