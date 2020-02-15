import { Injectable } from '@nestjs/common';
import { User, MusicianApprovement } from 'src/user/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ApproveUserDto } from './dto/approve-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectUserDto } from './dto/reject-user.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    getUnapprovedUsers(): Promise<User[]> {
        return this.userRepository.find({
            where: {
                musicianApprovement: MusicianApprovement.NA,
            }
        })
    }

    
    approveUser(
        userToApprove: ApproveUserDto
    ): Promise<UpdateResult> {
        return this.userRepository.update(userToApprove.userId, {
            musicianApprovement: MusicianApprovement.A,
        });
    }

    rejectUser(
        userToReject: RejectUserDto,
    ): Promise<UpdateResult> {
        return this.userRepository.update(userToReject.userId, {
            musicianApprovement: MusicianApprovement.R,
        })
    }
}
