/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { Column, Entity,  Index,  PrimaryColumn } from 'typeorm';

@Index("TRA_EQU_PK", ["equCodcia","equNoEquipo"], { unique: true })
@Entity('TRA_EQU_EQUIPO', { schema: 'SISTRS' })
export class Equipos {
  @PrimaryColumn("varchar2",{ name: 'EQU_CODCIA', length: 3 })
  equCodcia?: string;
  @PrimaryColumn("number",{ name: 'EQU_NO_EQUIPO', precision: 5, scale: 0  })
  equNoEquipo?: number;
  @PrimaryColumn("varchar2",{ name: 'EQU_ESTADO', length: 1  })
  equEstado?: string;
  @PrimaryColumn("number",{ name: 'EQU_ANIO_CODENTI', precision: 4, scale: 0  })
  equAnioCodenti?: number;
  @Column("varchar2",{ name: 'EQU_CODENTI', length: 3 })
  equCodenti?: string;
  @Column("varchar2",{ name: 'EQU_COD_DISP', length: 1 })
  equCodDisp?: string;
  @Column("varchar2",{ name: 'EQU_COD_UBI', length: 1 })
  equCodUbi?: string;
  @Column("number",{ name: 'EQU_KILMTR_ACTUAL', precision: 15, scale: 0})
  equKilmtrActual?: number;
  @Column("number",{ name: 'EQU_KILMTR_BASE', precision: 15, scale: 0})
  equKilmtrBase?: number;
  @Column("number",{ name: 'EQU_KILMTR_ESPEC', precision: 15, scale: 0})
  equKilmtrEspec?: number;
  @Column("varchar2",{ name: 'EQU_CLASE_MANTTO', length: 3})
  equClaseMantto?: string;
  @Column("varchar2",{ name: 'EQU_NO_PLACA', length: 10 })
  equNoPlaca?: string;  
  @Column("varchar2",{ name: 'EQU_ANIO_FAB', length: 4 })
  equAnioFab?: string;  
  @Column("varchar2",{ name: 'EQU_COD_MARCA', length: 2 })
  equCodMarca?: string;  
  @Column("varchar2",{ name: 'EQU_COD_CLASE', length: 2 })
  equCodClase?: string;  
  @Column("varchar2",{ name: 'EQU_MODELO', length: 30 })
  equModelo?: string; 
  @Column("varchar2",{ name: 'EQU_NO_CHASIS', length: 30 })
  equNoChasis?: string;   
  @Column("varchar2",{ name: 'EQU_NO_MOTOR', length: 30 })
  equNoMotor?: string;     
  @Column("varchar2",{ name: 'EQU_COD_CILINDRO', length: 2 })
  equCodColindro?: string; 
  @Column("varchar2",{ name: 'EQU_COD_TRANSMISION', length: 2 })
  equCodTransmision?: string;  
  @Column("varchar2",{ name: 'EQU_COLOR', length: 15 })
  equColor?: string;  
  @Column("varchar2",{ name: 'EQU_COD_CABINA', length: 2  })
  equCodCabina?: string;    
  @Column("varchar2",{ name: 'EQU_CAPCIDAD_CARGA', length: 15 })
  equCapcidadCarga?: string;  
  @Column("varchar2",{ name: 'EQU_PAIS_ORIGEN', length: 2 })
  equPaisOrigen?: string;   
  @Column("varchar2",{ name: 'EQU_COD_COMBUSTIBLE', length: 1 })
  equCodCombustible?: string;  
  @Column("number",{ name: 'EQU_VALOR_ADQUISICION', precision: 12, scale: 2 })
  equValorAdquisicion?: number;  
  @Column("number",{ name: 'EQU_VALOR_SEGURO', precision: 12, scale: 2})
  equValorSeguro?: number;  
  @Column("varchar2",{ name: 'EQU_NO_LICITACION', length: 15 })
  equNoLicitacion?: string;     
  @Column("number",{ name: 'EQU_CODPRV', precision: 8, scale: 0})
  equCodprv?: number;   
  @Column("timestamp",{ name: 'EQU_FEC_RECIBIDO', nullable: true })
  @Type(() => Date)
  equFecRecibido?: Date | null;
  @Column("varchar2",{ name: 'EQU_COD_RESPONSABLE', length: 8 })
  equCodResponsable?: string;  
  @Column("varchar2",{ name: 'EQU_COD_USO', length: 2 })
  equCodUso?: string; 
  @Column("varchar2",{ name: 'EQU_NO_SESION_JD', length: 10 })
  equNoSesionJd?: string; 
  @Column("varchar2",{ name: 'EQU_PROCEDENCIA_FONDO', length: 25 })
  equProcedenciaFondo?: string;   
  @Column("timestamp",{ name: 'EQU_FEC_ULT_REPARACION', nullable: true })
  @Type(() => Date)
  equFecUltReparacion?: Date | null;  
  @Column("varchar2",{ name: 'EQU_FEC_ULT_MATTO', nullable: true })
  @Type(() => Date)
  equFecUltMatto?: Date | null;  
  @Column("number",{ name: 'EQU_RENDIMIENTO', precision: 14, scale: 2 })
  equRendimiento?: number; 
  @Column("number",{ name: 'EQU_PRECIO_SUBASTA', precision: 12, scale: 2})
  equPrecioSubasta?: number; 
  @Column("timestamp",{ name: 'EQU_FEC_DESCARGA', nullable: true })
  @Type(() => Date)
  equFecDescarga?: Date | null;
  @Column("varchar2",{ name: 'EQU_COD_RESP_DESC', length: 8 })
  equCodRespDesc?: string;       
  @Column("varchar2",{ name: 'EQU_OBSERVACIONES', length: 200 })
  equObservaciones?: string; 
  @Column("varchar2",{ name: 'EQU_COD_ACTFIJO', length: 6 })
  equCodActfijo?: string;         
  @Column("varchar2",{ name: 'EQU_CR', length: 8 })
  equCr?: string; 
  @Column("varchar2",{ name: 'EQU_PROY', length: 5 })
  equProy?: string;
  @Column("number",{ name: 'EQU_BATERIA_AMP', precision: 12, scale: 2 })
  equBateriaAmp?: number;        
  @Column("varchar2",{ name: 'EQU_LLANTAS_MED', length: 25 })
  equLlantasMed?: string; 
  @Column("varchar2",{ name: 'EQU_CODEMP_MOT', length: 8 })
  equCodempMot?: string;
  @Column("varchar2",{ name: 'EQU_CATEGORIA', length:1 })
  equCategoria?: string;     
  @Column("varchar2",{ name: 'EQU_FLOTA', length:1})
  equFlota?: string;
  @Column("number",{ name: 'EQU_KIL_PROM', precision: 15, scale: 0 })
  equKilProm?: number;  
  @Column("varchar2",{ name: 'EQU_PRESTAMO', length: 1 })
  equPrestamo?: string; 
  @Column("varchar2",{ name: 'EQU_CODTAE', length: 20 })
  equCodtae?: string; 
}
