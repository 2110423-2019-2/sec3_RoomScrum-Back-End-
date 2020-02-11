import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event, Application } from './events.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event,Application])],
  providers: [EventsService],
  controllers: [EventsController]
  
})
export class EventsModule {}
