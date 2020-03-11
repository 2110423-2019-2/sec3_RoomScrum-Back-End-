import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "src/entity/events.entity";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { ContractService } from "src/contract/contract.service";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService, ContractService],
  controllers: [EventsController]
})
export class EventsModule {}
