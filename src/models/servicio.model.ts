import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Paciente} from './paciente.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idservicio?: string;

  @property({
    type: 'string',
    required: true,
  })
  serviciorequerido: string;

  @property({
    type: 'number',
    required: true,
  })
  costoservicio: number;

  @property({
    type: 'string',
    required: true,
  })
  medicamentos: string;

  @belongsTo(() => Paciente)
  pacienteId: string;

  @property({
    type: 'string',
  })
  facturaId?: string;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
