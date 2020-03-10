import { Injectable } from "@nestjs/common";
import { User, MusicianApprovement, UserType } from "src/entity/user.entity";
import { Repository, UpdateResult, MoreThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SelectUserDto } from "./dto/select-user.dto";
import { BanUserDto } from './dto/ban-user.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getUnapprovedUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        musicianApprovement: MusicianApprovement.NotApproved,
        userType: UserType.Musician
      }
    });
  }

  approveUser(userToApprove: SelectUserDto): Promise<UpdateResult> {
    return this.userRepository.update(userToApprove.userId, {
      musicianApprovement: MusicianApprovement.Approved
    });
  }

  rejectUser(userToReject: SelectUserDto): Promise<UpdateResult> {
    return this.userRepository.update(userToReject.userId, {
      musicianApprovement: MusicianApprovement.Rejected
    });
  }

  banUser(banInfo: BanUserDto): Promise<UpdateResult> {
    const banDate = new Date();
    banDate.setTime(banDate.getTime() + 1000 * 3600 * 24 * banInfo.banDuration); 
    return this.userRepository.update({username: banInfo.username}, {
      banUntil: banDate,
    });
  }

  getBannedUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: { banUntil: MoreThan(new Date())}
    })
  }
}
