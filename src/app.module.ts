import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from './events/events.module';
import { Event,Application } from 'src/events/events.entity';
import { UploadModule } from "src/upload/upload.module";
import { AdminModule } from './admin/admin.module';

import config from 'src/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
      entities: [User,Event,Application],
      synchronize: true
    }),
    AuthModule,
    EventsModule,
    UploadModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
