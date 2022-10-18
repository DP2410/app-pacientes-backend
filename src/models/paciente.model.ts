import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicio} from './servicio.model';

@model()
export class Paciente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  eps: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  constructor(data?: Partial<Paciente>) {
    super(data);
  }
}

export interface PacienteRelations {
  // describe navigational properties here
}

export type PacienteWithRelations = Paciente & PacienteRelations;
