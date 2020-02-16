import { Controller, Body, HttpException, HttpStatus,
    UsePipes, ValidationPipe, Res,
    UseInterceptors, UploadedFile, Param, UseGuards, Req  } from "@nestjs/common";
import { Get, Post, Put } from '@nestjs/common';
import { Event } from 'src/entity/events.entity';
import { EventsService } from './events.service';
import createEventDto from  './dto/create-event-dto';
import { AuthGuard } from "@nestjs/passport";

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    findAllEvents(): Promise<Event[]> {
        return this.eventsService.findAllEvent();
    }
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post()
    async createEvent(@Body() event: createEventDto): Promise<any> {
        try{
            return await this.eventsService.create(event);
        } catch(err) {
            if (err.errno === 1062){
                throw new HttpException('event id error', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
            }
        }
    }


}
