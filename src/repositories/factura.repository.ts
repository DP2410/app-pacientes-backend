import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Servicio} from '../models';
import {ServicioRepository} from './servicio.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idfactura,
  FacturaRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Factura.prototype.idfactura>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Factura, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
