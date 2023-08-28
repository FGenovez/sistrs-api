/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Create_Usuario_Dto {
    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    uvsCodcia?: string;

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    uvsCodigo?: number;    

    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    uvsDui?: string;

    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    uvsNombre?: string;
    
    @IsString()
    @IsOptional()  
    @ApiProperty({ description: '', type: String })
    uvsPassword?: string;    

    @IsNumber()
    @IsOptional()  
    @ApiProperty({ description: '', type: Number })
    uvsCodrol?: number;    

}