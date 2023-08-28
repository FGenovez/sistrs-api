import { PartialType, OmitType } from '@nestjs/swagger';
import { Create_Encuesta_Dto } from './create_encuesta_dto';

export class Edit_Encuesta_Dto extends PartialType(
    OmitType(Create_Encuesta_Dto, [] as const),
) { }