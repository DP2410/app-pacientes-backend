import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, Paciente} from '../models';
import {PacienteRepository} from './paciente.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.idservicio,
  ServicioRelations
> {

  public readonly paciente: BelongsToAccessor<Paciente, typeof Servicio.prototype.idservicio>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PacienteRepository') protected pacienteRepositoryGetter: Getter<PacienteRepository>,
  ) {
    super(Servicio, dataSource);
    this.paciente = this.createBelongsToAccessorFor('paciente', pacienteRepositoryGetter,);
    this.registerInclusionResolver('paciente', this.paciente.inclusionResolver);
  }
}
