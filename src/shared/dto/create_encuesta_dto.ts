/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Create_Encuesta_Dto {
    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    reeCodcia?: string;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    reeAnisol?: number;    

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    reeMessol?: number;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    reeCodsol?: number;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    reeCodigo?: number;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    reeCodprg?: number;    

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    rreCodorc?: number;   

    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    rreRespuesta?: string;    


}