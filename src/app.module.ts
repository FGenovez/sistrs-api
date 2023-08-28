import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Empleados, Unidades } from './shared/entities';
import { HttpModule } from '@nestjs/axios';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { Solicitudes } from './shared/entities/solicitud.entity';
import { Equipos } from './shared/entities/equipo.entity';
import { Usuarios } from './shared/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { Dominios } from './shared/entities/dominio.entity';
import { Trs_Ree_Entity } from './shared/entities/encuestas.entity';
import { Trs_Prg_Entity } from './shared/entities/preguntas.entity';
import { Trs_Orc_Entity } from './shared/entities/respuestas.entity';

@Module({
  imports: [
    SolicitudesModule,
    AuthModule,
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      logging: true,
      connectString: process.env.ORA_CONECTION,
      port: parseInt(process.env.ORA_PORT),
      username: process.env.ORA_USERNAME,
      password: process.env.ORA_PASSWORD,
      database: process.env.ORA_DATABASE,
      schema: process.env.ORA_SCHEMA,
      entities: [Empleados, Unidades, Equipos, Solicitudes, Usuarios, Dominios,Trs_Prg_Entity, Trs_Orc_Entity, Trs_Ree_Entity],
      //autoLoadEntities:true,
      // synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.HOST_MAIL,
          port: parseInt(process.env.PORT_MAIL),
          secure: Boolean(JSON.parse(process.env.SECURE_MAIL)),
        },
        defaults: {
          from: '"No Reply" <fgenovez@cel.gob.sv>',
        },
        template: {
          dir: process.cwd() ,//dir: join(__dirname, '../views/email-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
