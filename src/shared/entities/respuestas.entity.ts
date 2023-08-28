import { Column, Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryColumn } from 'typeorm';
import { Trs_Prg_Entity } from './preguntas.entity';

@Index("TRS_ORC_PK", ["orcCodprg", "orcCodigo"], { unique: true })
@Entity('TRS_ORC_OPCRESPCERRADAS', { schema: 'SISTRS' })
export class Trs_Orc_Entity {
    @PrimaryColumn("number",{ name: 'ORC_CODPRG', precision: 3, scale: 0  })
    orcCodprg?: number;
    @PrimaryColumn("number",{ name: 'ORC_CODIGO', precision: 3, scale: 0  })
    orcCodigo?: number;
    @Column("varchar2",{ name: 'ORC_DESCRIPCION', length: 500})
    orcDescripcion?: string;

    @ManyToOne(() => Trs_Prg_Entity, (v_prg_d) => v_prg_d.detalle_orc)
    @JoinColumn ([{ name: "ORC_CODPRG", referencedColumnName: "prgCodigo" }])
    encabezado_prg: Trs_Prg_Entity[];    
}