import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "src/entity/application.entity";
import { Event } from 'src/entity/events.entity';
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { EventsModule } from "src/events/events.module";
import { Contract } from "src/entity/contract.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Application, Event, Contract])],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
