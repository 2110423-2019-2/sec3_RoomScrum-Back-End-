import { Injectable } from "@nestjs/common";
import { User, MusicianApprovement, UserType } from "src/entity/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SelectUserDto } from "./dto/select-user.dto";

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
}
