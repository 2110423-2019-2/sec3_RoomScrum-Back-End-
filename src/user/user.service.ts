import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { User, UserType } from "src/entity/user.entity";
import { hash } from "bcrypt";
import createUserDto from "./dto/create-user-dto";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  find(user: Partial<User>): Promise<User[]> {
    return this.userRepository.find({
      where: user
    });
  }

  findUserById(userId: number): Promise<User[]> {
    return this.userRepository.find({"userId": userId});
    }

    async updateProfile(userId: number, user: createUserDto){
      const hashedPassword = await hash(user.password, 8);
      user.password = hashedPassword;
        return this.userRepository.update({"userId": userId}, user);
    }

  findFromUsername(username: string): Promise<User[]> {
    return this.userRepository.find({
      where: {username: Like(`%${username}%`)}
    })
  }

  async create(user: createUserDto): Promise<any> {
    const hashedPassword = await hash(user.password, 8);
    user.password = hashedPassword;

    const userEntity: User = await this.userRepository.create(user);

    await this.userRepository.save(userEntity);
    return userEntity;
  }

  async uploadProfilePic(@UploadedFile() file, userId: number): Promise<any> {
    const imagePath = file.filename;
    this.userRepository.update(userId, { profileImage: imagePath });
    return;
  }

  async uploadIdPic(@UploadedFile() file, userId: number): Promise<any> {
    const imagePath = file.filename;

    this.userRepository.update(userId, { nationalCardImage: imagePath });

    return;
  }

  async getProfilePicPath(id: number) {
    const imgPath = await (
      await this.userRepository.findOneOrFail({ userId: id })
    ).profileImage;
    return imgPath;
  }

  async getIdPicPath(id: number) {
    const imgPath = await (
      await this.userRepository.findOneOrFail({ userId: id })
    ).nationalCardImage;
    return imgPath;
  }
}
