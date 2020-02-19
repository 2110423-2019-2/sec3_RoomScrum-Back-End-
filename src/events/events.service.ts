import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from 'src/entity/events.entity'
import createEventDto from './dto/create-event-dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) {}

    findAllEvent(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async create(event: createEventDto) {
        return this.eventRepository.insert(event);
    }
    
    async getEventPicName(id: number) {
        return (await this.eventRepository.findOneOrFail({eventId: id})).eventImage;
    }

    
}

