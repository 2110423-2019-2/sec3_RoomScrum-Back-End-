import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hiree } from 'src/entity/hiree.entity';
import createHireeDto from './dto/create-hiree-dto';

@Injectable()
export class HireeService {
    constructor(
        @InjectRepository(Hiree)
        private readonly hireeRepository: Repository<Hiree>
    ) {}
    
    async create(hiree: createHireeDto): Promise<any> {
        return this.hireeRepository.insert(hiree);
    }

}