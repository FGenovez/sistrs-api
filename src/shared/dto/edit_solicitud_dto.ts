import { PartialType, OmitType } from '@nestjs/swagger';
import { Create_Solicitud_Dto } from './create_solicitud_dto';

export class Edit_Solicitud_Dto extends PartialType(
    OmitType(Create_Solicitud_Dto, [] as const),
) { }