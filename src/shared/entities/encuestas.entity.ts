import { Type } from 'class-transformer';
import { Column, Entity,  Index,  OneToMany,  PrimaryColumn } from 'typeorm';
import { Trs_Orc_Entity } from './respuestas.entity';

@Index("TRS_REE_PK", ["reeCodcia", "reeAnisol", "reeMessol", "reeCodsol","reeCodigo","reeCodprg"], { unique: true })
@Entity('TRS_REE_RESEVAL_ENCUESTA', { schema: 'SISTRS' })
export class Trs_Ree_Entity {
    @PrimaryColumn("varchar2",{ name: 'REE_CODCIA', length: 3  })
    reeCodcia?: string;
    @PrimaryColumn("number",{ name: 'REE_ANISOL', precision: 4, scale: 0  })
    reeAnisol?: number;
    @PrimaryColumn("number",{ name: 'REE_MESSOL', precision: 3, scale: 0  })
    reeMessol?: number;
    @PrimaryColumn("number",{ name: 'REE_CODSOL', precision: 4, scale: 0  })
    reeCodsol?: number;
    @PrimaryColumn("number",{ name: 'REE_CODIGO', precision: 3, scale: 0  })
    reeCodigo?: number;            
    @PrimaryColumn("number",{ name: 'REE_CODPRG', precision: 3, scale: 0  })
    reeCodprg?: number; 
    @Column("number",{ name: 'REE_CODORC', precision: 3, scale: 0  })
    rreCodorc?: number;
    @Column("varchar2",{ name: 'REE_RESPUESTA', length: 1 })
    rreRespuesta?: string;
   
    
    
 //RELACIÓN PRG-ORC (ENCABEZADO)
 @OneToMany(() => Trs_Orc_Entity, (v_orc_e) => (v_orc_e.encabezado_prg))
 detalle_orc: Trs_Orc_Entity[];  

}