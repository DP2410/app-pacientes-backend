import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Paciente,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioPacienteController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/paciente', {
    responses: {
      '200': {
        description: 'Paciente belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Paciente)},
          },
        },
      },
    },
  })
  async getPaciente(
    @param.path.string('id') id: typeof Servicio.prototype.idservicio,
  ): Promise<Paciente> {
    return this.servicioRepository.paciente(id);
  }
}
