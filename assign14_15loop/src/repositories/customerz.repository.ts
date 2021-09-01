import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customerz, CustomerzRelations, Userz} from '../models';
import {UserzRepository} from './userz.repository';

export class CustomerzRepository extends DefaultCrudRepository<
  Customerz,
  typeof Customerz.prototype.id,
  CustomerzRelations
> {

  public readonly userzs: HasManyRepositoryFactory<Userz, typeof Customerz.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserzRepository') protected userzRepositoryGetter: Getter<UserzRepository>,
  ) {
    super(Customerz, dataSource);
    this.userzs = this.createHasManyRepositoryFactoryFor('userzs', userzRepositoryGetter,);
    this.registerInclusionResolver('userzs', this.userzs.inclusionResolver);
  }
}
