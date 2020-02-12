import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ApproveUserDto } from './dto/approve-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    getUnapprovedUsers(): Promise<User[]> {
        return this.userRepository.find({
            where: {
                isVerify: false,
            }
        })
    }

    
    approveUser(
        userToApprove: ApproveUserDto
    ): Promise<UpdateResult> {
        return this.userRepository.update(userToApprove.id, {
            isVerify: true,
        })
    }
}
