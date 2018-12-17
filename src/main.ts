import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
        .setTitle('Bots Api')
        .setDescription('The bots API description')
        .setVersion('1.0')
        .addTag('Bots')
        .addTag('Messages')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/swagger', app, document);
    await app.listen(3000);
}
bootstrap();
