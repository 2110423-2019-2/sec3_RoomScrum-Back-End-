import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application } from './application.entity';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
    ) {}

    findAllApplications(): Promise<Application[]> {
        return this.applicationRepository.find()
    }

    async apply(application: Application) {
        return this.applicationRepository.insert(application);
    }
}
