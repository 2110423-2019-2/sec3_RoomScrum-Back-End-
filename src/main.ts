import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('Room scrum')
    .setDescription('A musician and hirer matching service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}

bootstrap();
