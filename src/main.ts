import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Response, Request } from "express";
import * as cors from 'cors';

import config from 'src/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  if (config.ALLOW_CORS === "true") {
    app.use(cors());
    app.use((req: Request, res: Response, next) => {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', config.CORS_HOST);
      next();
    })
  }
  const options = new DocumentBuilder()
    .setTitle('Room scrum')
    .setDescription('A musician and hirer matching service')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(config.PORT);
}

bootstrap();
