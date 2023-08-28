import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class Create_Solicitud_Dto {
    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    solCodcia?: string;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    solAnio?: number;
    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    solMes?: number;
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solCodigo?: number;
    @IsString()
    @IsOptional() 
    @ApiProperty({ description: '', type: String })
    solEstado?: string;
    @IsString()
    @IsOptional() 
    @ApiProperty({ description: '', type: String })
    solTipo?: string;
    @IsString()
    @IsOptional() 
    @ApiProperty({ description: '', type: String })
    solCodent?: string;

    @IsOptional()  
    @IsDate()
    @ApiProperty({ description: '', type: Date })
    @Type(() => Date)
    solFecsol?: Date| null;

    @IsOptional()      
    @IsDate()
    @ApiProperty({ description: '', type: Date })
    @Type(() => Date)
    solFecser?: Date| null;

    @IsOptional()  
    @IsDate()
    @ApiProperty({ description: '', type: Date })
    @Type(() => Date)
    solFecreg?: Date| null;



    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    solCanper?: number;
    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    solHorsal?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solHorestRetorno?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solDesJus?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solCodresp?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solCodveh?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solNumlic?: string;   
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solTiplic?: string;     
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solTipveh?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solTipm?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solHoras?: string;  
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solEquipo?: number; 
    @IsString()
    @IsOptional()         
    @ApiProperty({ description: '', type: String })
    solPlaca?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solCodmot?: string;   
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solLlarep?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solMica?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solExtmic?: string;    
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solDespla?: string;
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solDesfil?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solLlarue?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solLlafij?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solCubo?: string;   
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solBolher?: string;   
    @IsString()
    @IsOptional()       
    @ApiProperty({ description: '', type: String })
    solTenaza?: string;   
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solTriref?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solExtint?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solEnctra?: string;
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solHorasalida?: string;       
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solHoraentrada?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solKmsSalida?: string;         
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solKmsEntrada?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solDlugsinruta?: string;
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solJustificacion?: string;        
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solConductor?: string; 
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solCodrut?: number;
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solCoddtn?: number;   
    @IsNumber()
    @IsOptional()        
    @ApiProperty({ description: '', type: Number })
    solNumDest?: number;
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solDestComp?: number;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solTitular?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solComp?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solComparteSn?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solCombinaSn?: string;  
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solCorrelativo?: number;  
    @IsString()
    @IsOptional()       
    @ApiProperty({ description: '', type: String })
    solAcompaniantes?: string;            
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solReqCambioHor?: string;  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solJusCambioHor?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solVbCambioHor?: string; 
    @IsString()
    @IsOptional()       
    @ApiProperty({ description: '', type: String })
    solHorCambio?: string; 
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solAreaMetro?: string;       
  
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solKilmtrSalida?: number;  
  
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solKilmtrEntrada?: number; 

    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solHorSalidaReal?: number; 
    
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solMinSalidaReal?: number; 
    
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solHorRegresoReal?: number; 
    
    @IsNumber()
    @IsOptional()      
    @ApiProperty({ description: '', type: Number })
    solMinRegresoReal?: number;     
  
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solDestinos?: string;   

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solHerramientas?: string;  

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solQuimicos?: string;      

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solAccesorios?: string;

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solVigilanteSal?: string;
    
    @IsString()
    @IsOptional()      
    @ApiProperty({ description: '', type: String })
    solVigilanteEnt?: string;  
    
    
    @IsOptional()  
    @IsDate()
    @ApiProperty({ description: 'solFechaRegreso', type: Date })
    @Type(() => Date)
    solFechaRegreso: Date | null;

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: 'solEncuestaSn', type: String })
    solEncuestaSn?: string; 

    @IsString()
    @IsOptional()      
    @ApiProperty({ description: 'solJustiencSn', type: String })
    solJustiencSn?: string; 

  }
  /*
  solEncuestaSn
  solJustiencSn
  */
