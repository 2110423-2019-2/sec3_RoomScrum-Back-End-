import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "src/entity/application.entity";
import { Event } from 'src/entity/events.entity';
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { EventsModule } from "src/events/events.module";

@Module({
  imports: [TypeOrmModule.forFeature([Application, Event])],
  providers: [ApplicationService],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
