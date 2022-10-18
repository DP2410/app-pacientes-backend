import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Factura,
  Servicio,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaServicioController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Factura has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.facturaRepository.servicios(id).find(filter);
  }

  @post('/facturas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.idfactura,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInFactura',
            exclude: ['idservicio'],
            optional: ['facturaId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'idservicio'>,
  ): Promise<Servicio> {
    return this.facturaRepository.servicios(id).create(servicio);
  }

  @patch('/facturas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Factura.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.facturaRepository.servicios(id).patch(servicio, where);
  }

  @del('/facturas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Factura.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.facturaRepository.servicios(id).delete(where);
  }
}
