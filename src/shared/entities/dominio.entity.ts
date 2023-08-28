/* eslint-disable prettier/prettier */
import { Column, Entity,  Index,  PrimaryColumn } from 'typeorm';
@Index("TRA_DOM_PK", ["domNombre","domValor","domCodcia"], { unique: true })
@Entity('TRA_DOM_DOMINIO', { schema: 'SISTRS' })
export class Dominios {
  @PrimaryColumn("varchar2",{ name: 'DOM_CODCIA',  length: 3 })
  domCodcia: string;
  @PrimaryColumn("varchar2",{ name: 'DOM_NOMBRE', length: 100 })
  domNombre: string;
  @PrimaryColumn("varchar2",{ name: 'DOM_VALOR', length: 3 })
  domValor: string;
  @Column("varchar2",{ name: 'DOM_DESCRIPCION',  length: 200 })
  domDescripcion: string;
  @Column("varchar2",{ name: 'DOM_OBSERVACIONES',  length: 200 })
  domObservaciones: string;
}