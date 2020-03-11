import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { Event } from "src/entity/events.entity";
import { ApplicationModule } from "./application/application.module";
import { Application } from "src/entity/application.entity";
import { AdminModule } from "./admin/admin.module";
import { Report } from "src/entity/report.entity";
import config from "src/config";
import { Hiree } from "./entity/hiree.entity";
import { from } from "rxjs";

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
      entities: [User, Hiree, Event, Application, Report],
      synchronize: true,
      // logging: true,
      // dropSchema:true,
    }),
    AuthModule,
    EventsModule,
    ApplicationModule,
    AdminModule,
    ApplicationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
