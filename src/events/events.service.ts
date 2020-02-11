import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event,Application } from './events.entity'

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,

        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
    ) {}

    findAllEvent(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async create(event: Event) {
        return this.eventRepository.insert(event);
    }
    
    findAllApplications(): Promise<Application[]> {
        return this.applicationRepository.find()
    }

    async apply(application: Application) {
        return this.applicationRepository.insert(application);
    }
}
