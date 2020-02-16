import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from 'src/entity/events.entity'

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) {}

    findAllEvent(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async create(event: Event) {
        return this.eventRepository.insert(event);
    }
}

