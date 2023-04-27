import { Service } from 'typedi';
import { DataSource, Repository, EntityTarget, ObjectLiteral } from 'typeorm';

@Service()
export abstract class BaseOrmRepository<E extends ObjectLiteral> {
  protected repo: Repository<E>;
  private target: EntityTarget<E>;

  constructor(
    dataSource: DataSource,
    target: EntityTarget<E>,
  ) {
    this.target = target;
    this.repo = dataSource.getRepository<E>(target);
  }

  async insertMany(values: E[]) {
    const entities = this.repo.create(values);
    await this.repo.insert(entities);
    return entities;
  }
}
