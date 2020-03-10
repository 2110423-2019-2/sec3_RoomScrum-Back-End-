import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
//find profile by id
    findProfileById(User: viewProfileDto){
        return this.userRepository.
    }

    updateProfile(User: viewProfileDto){
        return this.userRepository.
    }
}
