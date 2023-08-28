import { Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from 'src/shared/entities/solicitud.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../shared/entities/usuario.entity';
import { Equipos } from '../shared/entities/equipo.entity';
import { Empleados, Unidades } from 'src/shared/entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Dominios } from '../shared/entities/dominio.entity';
import { Trs_Prg_Entity } from 'src/shared/entities/preguntas.entity';
import { Trs_Orc_Entity } from 'src/shared/entities/respuestas.entity';
import { Trs_Ree_Entity } from 'src/shared/entities/encuestas.entity';

@Module({
  imports: [AuthModule,
   TypeOrmModule.forFeature([Empleados, Unidades,  Equipos, Solicitudes, Usuarios, Dominios,Trs_Prg_Entity, Trs_Orc_Entity, Trs_Ree_Entity])],
  controllers: [SolicitudesController],
  providers: [SolicitudesService]
})
export class SolicitudesModule {}
