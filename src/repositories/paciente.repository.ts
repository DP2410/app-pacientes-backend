import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Paciente, PacienteRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class PacienteRepository extends DefaultCrudRepository<
  Paciente,
  typeof Paciente.prototype.id,
  PacienteRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Paciente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Paciente, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
