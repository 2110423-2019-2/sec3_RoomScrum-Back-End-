import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Response, Request } from "express";
import * as cors from 'cors';

import config from 'src/config';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe); // https://docs.nestjs.com/techniques/validation

  var corsOptions = {
    Credentials: true,
    origin: config.CORS_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  if (config.ALLOW_CORS === "true") {
    app.use((req: Request, res: Response, next) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', config.CORS_HOST);
        res.setHeader('Access-Control-Allow-Methods',"POST, GET, OPTIONS, DELETE, PUT");
        next();
      })
      
    app.use(cors(corsOptions));
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
