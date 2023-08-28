import { Column, Entity,  Index,  PrimaryColumn } from 'typeorm';
import { Type } from "class-transformer";

@Index("TRA_UVS_PK", ["uvsCodcia","uvsCodigo"], { unique: true })
@Entity('TRA_UVS_USR_VALIDASOL')
export class Usuarios {
  @PrimaryColumn("varchar2", {primary: true,  name: 'UVS_CODCIA',  length: 3 })
  uvsCodcia?: string;
  @PrimaryColumn("number",{primary: true,  name: 'UVS_CODIGO' , precision: 2, scale: 0})
  uvsCodigo?: number;
  @Column("varchar2", { name: 'UVS_DUI',  length: 12 })
  uvsDui?: string;
  @Column("varchar2", { name: 'UVS_NOMBRE',  length: 100 })
  uvsNombre?: string;
  @Column("varchar2",{ name: 'UVS_PASSWORD', length: 50 })
  uvsPassword?: string;
  @Column("number", { name: 'UVS_CODROL', precision: 3, scale: 0 })
  uvsCodrol?: number;
}