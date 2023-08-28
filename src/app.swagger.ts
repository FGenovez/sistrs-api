import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('APIs para el Backend del SisTRS')
        .addBearerAuth()
        .setDescription('Esta es una API Creada con NestJS y TypeORM para el SISTRS - Mayo 2022 versión 1.1',
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
};