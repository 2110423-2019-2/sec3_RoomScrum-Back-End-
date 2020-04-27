import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "src/entity/application.entity";
import { Event } from 'src/entity/events.entity';
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { EventsModule } from "src/events/events.module";
import { Contract } from "src/entity/contract.entity";
import { NotificationModule } from "src/notification/notification.module";
import { NotificationService } from "src/notification/notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([Application, Event, Contract]), NotificationModule],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
