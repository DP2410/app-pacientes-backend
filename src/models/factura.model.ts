import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicio} from './servicio.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idfactura?: string;

  @property({
    type: 'number',
    required: true,
  })
  costototal: number;

  @property({
    type: 'string',
    required: true,
  })
  serviciosprestados: string;

  @property({
    type: 'string',
    required: true,
  })
  celcliente: string;

  @property({
    type: 'string',
    required: true,
  })
  doctorqueatiende: string;

  @hasMany(() => Servicio)
  servicios: Servicio[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
