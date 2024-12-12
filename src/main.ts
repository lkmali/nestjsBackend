import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('Jaldi do backend api')
    .setDescription('API get way for our jaldi do backend api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory,{
    swaggerOptions:{
        persistAuthorization:true
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
