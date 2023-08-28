/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Column, Entity,  Index,  PrimaryColumn } from 'typeorm';

@Index("TRA_SOL_PK", ["solCodcia","solAnio","solMes","solCodigo"], { unique: true })
@Entity('TRA_SOL_SERV_TRANS', { schema: 'SISTRS' })
export class Solicitudes {
  @PrimaryColumn("varchar2",{ name: 'SOL_CODCIA', length: 3 })
  solCodcia?: string;
  @PrimaryColumn("number",{ name: 'SOL_ANIO', precision: 4, scale: 0  })
  solAnio?: number;
  @PrimaryColumn("number",{ name: 'SOL_MES', precision: 2, scale: 0  })
  solMes?: number;
  @PrimaryColumn("number",{ name: 'SOL_CODIGO', precision: 4, scale: 0  })
  solCodigo?: number;
  @Column("varchar2",{ name: 'SOL_ESTADO', length: 1 })
  solEstado?: string;
  @Column("varchar2",{ name: 'SOL_TIPO', length: 1 })
  solTipo?: string;
  @Column("varchar2",{ name: 'SOL_CODENT', length: 3 })
  solCodent?: string;
  @Column("timestamp",{ name: 'SOL_FECSOL', nullable: true})
  @Type(() => Date)
  solFecsol?: Date | null;
  @Column("timestamp",{ name: 'SOL_FECSER', nullable: true})
  @Type(() => Date)
  solFecser?: Date | null;
  @Column("timestamp",{ name: 'SOL_FECREG', nullable: true})
  @Type(() => Date)
  solFecreg?: Date | null;
  @Column("number",{ name: 'SOL_CANPER', precision: 5, scale: 0 })
  solCanper?: number;
  @Column("varchar2",{ name: 'SOL_HORSAL', length: 15 })
  solHorsal?: string;  
  @Column("varchar2",{ name: 'SOL_HOREST_RETORNO', length: 15 })
  solHorestRetorno?: string;  
  @Column("varchar2",{ name: 'SOL_DES_JUS', length: 1000 })
  solDesJus?: string;  
  @Column("varchar2",{ name: 'SOL_CODRESP', length: 8 })
  solCodresp?: string;  
  @Column("varchar2",{ name: 'SOL_CONVEH', length: 8 })
  solCodveh?: string; 
  @Column("varchar2",{ name: 'SOL_NUMLIC', length: 20 })
  solNumlic?: string;   
  @Column("varchar2",{ name: 'SOL_TIPLIC', length: 1 })
  solTiplic?: string;     
  @Column("varchar2",{ name: 'SOL_TIPVEH', length: 1 })
  solTipveh?: string; 
  @Column("varchar2",{ name: 'SOL_TIPM', length: 1 })
  solTipm?: string;  
  @Column("varchar2",{ name: 'SOL_HORAS', length: 15 })
  solHoras?: string;  
  @Column("number",{ name: 'SOL_EQUIPO', precision: 5, scale: 0  })
  solEquipo?: number;    
  @Column("varchar2",{ name: 'SOL_PLACA', length: 10 })
  solPlaca?: string;  
  @Column("varchar2",{ name: 'SOL_CODMOT', length: 8 })
  solCodmot?: string;   
  @Column("varchar2",{ name: 'SOL_LLAREP', length: 1 })
  solLlarep?: string;  
  @Column("varchar2",{ name: 'SOL_MICA', length: 1 })
  solMica?: string;  
  @Column("varchar2",{ name: 'SOL_EXTMIC', length: 1 })
  solExtmic?: string;    
  @Column("varchar2",{ name: 'SOL_DESPLA', length: 1 })
  solDespla?: string;
  @Column("varchar2",{ name: 'SOL_DESFIL', length: 1 })
  solDesfil?: string;  
  @Column("varchar2",{ name: 'SOL_LLARUE', length: 1 })
  solLlarue?: string; 
  @Column("varchar2",{ name: 'SOL_LLAFIJ', length: 1 })
  solLlafij?: string; 
  @Column("varchar2",{ name: 'SOL_CUBO', length: 1 })
  solCubo?: string;   
  @Column("varchar2",{ name: 'SOL_BOLHER', length: 1 })
  solBolher?: string;    
  @Column("varchar2",{ name: 'SOL_TENAZA', length: 1 })
  solTenaza?: string;   
  @Column("varchar2",{ name: 'SOL_TRIREF', length: 1 })
  solTriref?: string; 
  @Column("varchar2",{ name: 'SOL_EXTINT', length: 1 })
  solExtint?: string; 
  @Column("varchar2",{ name: 'SOL_ENCTRA', length: 8 })
  solEnctra?: string;
  @Column("varchar2",{ name: 'SOL_HORASALIDA', length: 15 })
  solHorasalida?: string;       
  @Column("varchar2",{ name: 'SOL_HORAENTRADA', length: 15 })
  solHoraentrada?: string; 
  @Column("varchar2",{ name: 'SOL_KMS_SALIDA', length: 15 })
  solKmsSalida?: string;         
  @Column("varchar2",{ name: 'SOL_KMS_ENTRADA', length: 15 })
  solKmsEntrada?: string; 
  @Column("varchar2",{ name: 'SOL_DLUGSINRUTA', length: 1000 })
  solDlugsinruta?: string;
  @Column("varchar2",{ name: 'SOL_JUSTIFICACION', length: 1000 })
  solJustificacion?: string;        
  @Column("varchar2",{ name: 'SOL_CONDUCTOR', length: 8 })
  solConductor?: string; 
  @Column("number",{ name: 'SOL_CODRUT', precision: 4, scale: 0 })
  solCodrut?: number;
  @Column("number",{ name: 'SOL_CODDTN', precision: 4, scale: 0 })
  solCoddtn?: number;     
  @Column("number",{ name: 'SOL_NUM_DEST', precision: 3, scale: 0 })
  solNumDest?: number;
  @Column("number",{ name: 'SOL_DEST_COMP', precision: 3, scale: 0 })
  solDestComp?: number;  
  @Column("varchar2",{ name: 'SOL_TITULAR', length: 1 })
  solTitular?: string; 
  @Column("varchar2",{ name: 'SOL_COMP', length: 1 })
  solComp?: string; 
  @Column("varchar2",{ name: 'SOL_COMPARTE_SN', length: 1 })
  solComparteSn?: string;  
  @Column("varchar2",{ name: 'SOL_COMBINA_SN', length: 1 })
  solCombinaSn?: string;  
  @Column("number",{ name: 'SOL_CORRELATIVO', precision: 10, scale: 0 })
  solCorrelativo?: number;   
  @Column("varchar2",{ name: 'SOL_ACOMPANIANTES', length: 1000 })
  solAcompaniantes?: string;            
  @Column("varchar2",{ name: 'SOL_REQ_CAMBIO_HOR', length: 1 })
  solReqCambioHor?: string;  
  @Column("varchar2",{ name: 'SOL_JUS_CAMBIO_HOR', length: 1000 })
  solJusCambioHor?: string; 
  @Column("varchar2",{ name: 'SOL_VB_CAMBIO_HOR', length: 1 })
  solVbCambioHor?: string;  
  @Column("varchar2",{ name: 'SOL_HOR_CAMBIO', length: 15 })
  solHorCambio?: string; 
  @Column("varchar2",{ name: 'SOL_AREA_METRO', length: 1 })
  solAreaMetro?: string;       
  @Column("number",{ name: 'SOL_KILMTR_SALIDA', precision: 15, scale: 0 })
  solKilmtrSalida?: number; 
  @Column("number",{ name: 'SOL_KILMTR_ENTRADA', precision: 15, scale: 0 })
  solKilmtrEntrada?: number;  
  @Column("number",{ name: 'SOL_HOR_SALIDA_REAL', precision: 2, scale: 0 })
  solHorSalidaReal?: number; 
  @Column("number",{ name: 'SOL_MIN_SALIDA_REAL', precision: 2, scale: 0 })
  solMinSalidaReal?: number;  
  @Column("number",{ name: 'SOL_HOR_REGRESO_REAL', precision: 2, scale: 0 })
  solHorRegresoReal?: number; 
  @Column("number",{ name: 'SOL_MIN_REGRESO_REAL', precision: 2, scale: 0 })
  solMinRegresoReal?: number;    
  @Column("varchar2",{ name: 'SOL_DESTINOS', length: 4000 })
  solDestinos?: string; 
  
  @Column("timestamp",{ name: 'SOL_FECHA_REGRESO', nullable: true})
  @Type(() => Date)
  solFechaRegreso?: Date | null;  

  @Column("varchar2",{ name: 'SOL_HERRAMIENTAS', length: 1 })
  solHerramientas?: string;  
  @Column("varchar2",{ name: 'SOL_QUIMICOS', length: 1 })
  solQuimicos?: string; 
  @Column("varchar2",{ name: 'SOL_ACCESORIOS', length: 1 })
  solAccesorios?: string; 

  @Column("varchar2",{ name: 'SOL_VIGILANTE_SAL', length: 12 })
  solVigilanteSal?: string; 
  @Column("varchar2",{ name: 'SOL_VIGILANTE_ENT', length: 12 })
  solVigilanteEnt?: string; 

  @Column("varchar2",{ name: 'SOL_ENCUESTA_SN', length: 1 })
  solEncuestaSn?: string; 
  @Column("varchar2",{ name: 'SOL_JUSTIENC_SN', length: 3 })
  solJustiencSn?: string;   

}
