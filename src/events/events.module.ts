import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/entity/events.entity";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { Application } from 'src/entity/application.entity';
import { ApplicationModule } from "src/application/application.module";
import { Contract } from "src/entity/contract.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Application, Contract])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
