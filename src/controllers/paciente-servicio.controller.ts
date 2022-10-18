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
  Paciente,
  Servicio,
} from '../models';
import {PacienteRepository} from '../repositories';

export class PacienteServicioController {
  constructor(
    @repository(PacienteRepository) protected pacienteRepository: PacienteRepository,
  ) { }

  @get('/pacientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Paciente has many Servicio',
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
    return this.pacienteRepository.servicios(id).find(filter);
  }

  @post('/pacientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Paciente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paciente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInPaciente',
            exclude: ['idservicio'],
            optional: ['pacienteId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'idservicio'>,
  ): Promise<Servicio> {
    return this.pacienteRepository.servicios(id).create(servicio);
  }

  @patch('/pacientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Paciente.Servicio PATCH success count',
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
    return this.pacienteRepository.servicios(id).patch(servicio, where);
  }

  @del('/pacientes/{id}/servicios', {
    responses: {
      '200': {
        description: 'Paciente.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.pacienteRepository.servicios(id).delete(where);
  }
}
