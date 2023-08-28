/* eslint-disable prettier/prettier */
import { Column, Entity,  PrimaryColumn } from 'typeorm';

@Entity('PLA_UNI_UNIDAD', { schema: 'SISRRH' })
export class Unidades {
  @PrimaryColumn({ name: 'UNI_CODCIA', type: 'varchar2', length: 3 })
  codcia: string;
  @PrimaryColumn({ name: 'UNI_CODIGO' })
  id: number;
  @Column({ name: 'UNI_NOMBRE', type: 'varchar2', length: 80 })
  nombre: string;
  @Column({ name: 'UNI_CODENTI', type: 'varchar2', length: 5 })
  codenti: string;
  @Column({ name: 'UNI_ESTADO', type: 'varchar2', length: 1 })
  estado: string;
}
