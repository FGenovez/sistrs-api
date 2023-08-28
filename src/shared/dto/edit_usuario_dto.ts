import { PartialType, OmitType } from '@nestjs/swagger';
import { Create_Usuario_Dto } from './create_usuario_dto';

export class Edit_Usuario_Dto extends PartialType(
    OmitType(Create_Usuario_Dto, [] as const),
) { }