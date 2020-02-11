import { Controller, Body, HttpException, HttpStatus } from "@nestjs/common";
import { Get, Post, Put } from '@nestjs/common';
import { Event, Application } from './events.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    findAllEvents(): Promise<Event[]> {
        return this.eventsService.findAllEvent();
    }

    @Post()
    async createEvent(@Body() event: Event): Promise<any> {
        try{
            return await this.eventsService.create(event);
        } catch(err) {
            throw new HttpException('event id error', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('apply')
    findAllApplications(): Promise<Application[]> {
        return this.eventsService.findAllApplications();
    }

    @Post('apply')
    async applyEvent(@Body() application: Application): Promise<any> {
        try{
            return await this.eventsService.apply(application);
        } catch(err) {
            throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
        }
    }
}
