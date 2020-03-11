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
import config from "src/config";
import { Hiree } from "./entity/hiree.entity";
import { NotificationModule } from "./notification/notification.module";
import { Notification, EventInviteInfo, BandInviteInfo, EventStateUpdateInfo } from "./entity/notification.entity";
import { ReportModule } from './report/report.module';
import { Report } from "./entity/report.entity";

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
      entities: [User, Hiree, Event, Application, Report,
        Notification, EventInviteInfo, BandInviteInfo, EventStateUpdateInfo,
      ],
      synchronize: true,
      // logging: true,
      // dropSchema:true,
    }),
    AuthModule,
    EventsModule,
    ApplicationModule,
    AdminModule,
    ApplicationModule,
    NotificationModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
