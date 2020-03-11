import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "src/entity/application.entity";
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { EventsModule } from "src/events/events.module";
import { ContractModule } from "src/contract/contract.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    EventsModule,
    ContractModule
  ],
  providers: [ApplicationService, ],
  controllers: [ApplicationController]
})
export class ApplicationModule {}
