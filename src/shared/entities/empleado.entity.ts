/* eslint-disable prettier/prettier */
import { Column, Entity,  PrimaryColumn } from 'typeorm';

@Entity('PLA_EMP_EMPLEADO', { schema: 'SISRRH' })
export class Empleados {
  @PrimaryColumn({ name: 'EMP_CODCIA', type: 'varchar2', length: 3 })
  codcia: string;
  @PrimaryColumn({ name: 'EMP_CODIGO' })
  id: number;
  @Column({ name: 'EMP_NOMBRE_CIP', type: 'varchar2', length: 60 })
  nombre: string;
  @Column({ name: 'EMP_CORREO', type: 'varchar2', length: 25 })
  correo: string;
  @Column({ name: 'EMP_CODENTI', type: 'varchar2', length: 3 })
  codenti: string;
  @Column({ name: 'EMP_CODCEL', type: 'varchar2', length: 8 })
  codcel: string;
  @Column({ name: 'EMP_SEXO', type: 'varchar2', length: 1 })
  sexo: string;
  @Column({ name: 'EMP_PROFESION', type: 'varchar2', length: 90 })
  profesion: string;
  @Column({ name: 'EMP_ESTADO', type: 'varchar2', length: 1 })
  estado: string;
}
