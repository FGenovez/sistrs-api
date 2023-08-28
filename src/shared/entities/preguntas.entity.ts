import { Column, Entity,  Index,  OneToMany,  PrimaryColumn } from 'typeorm';
import { Trs_Orc_Entity } from './respuestas.entity';

@Index("TRS_PRG_PK", ["prgCodigo"], { unique: true })
@Entity('TRS_PRG_PREGUNTAS', { schema: 'SISTRS' })
export class Trs_Prg_Entity {
    @PrimaryColumn("number",{ name: 'PRG_CODIGO', precision: 3, scale: 0  })
    prgCodigo?: number;
    @Column("varchar2",{ name: 'PRG_ENUNCIADO', length: 500})
    prgEnunciado?: string;
    @Column("varchar2",{ name: 'PRG_TIPO', length: 1 })
    prgTipo?: string;
    @Column("varchar2",{ name: 'PRG_ESTADO', length: 1 })
    prgEstado?: string;   
    
    
 //RELACIÓN PRG-ORC (ENCABEZADO)
 @OneToMany(() => Trs_Orc_Entity, (v_orc_e) => (v_orc_e.encabezado_prg))
 detalle_orc: Trs_Orc_Entity[];  

}