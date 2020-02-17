import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { compare, hash } from 'bcrypt';
import createUserDto from "./dto/create-user-dto";
import createHireeDto from 'src/hiree/dto/create-hiree-dto';
import { Request } from "express";
import { HireeService } from "src/hiree/hiree.service";
import { Hiree } from "src/entity/hiree.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hireeService: HireeService
  ) {}
  
  find(user: Partial<User>): Promise<User[]> {
    return this.userRepository.find({
      where: user,
    });
  }

  findFromId(id: number): Promise<User[]> {
    return this.userRepository.find({
      userId: id
    })
  }

  async create(user: createUserDto): Promise<any> {
    const hashedPassword = await hash(user.password, 8);
    user.password = hashedPassword;

    const hiree: Hiree = await this.hireeService.create(new createHireeDto());

    const userEntity: User = await this.userRepository.create(user);
    userEntity.hiree = hiree;

    await this.userRepository.save(userEntity);
    return userEntity;

  }

  async uploadPic(@UploadedFile() file, userId: number): Promise<any> {
    const imagePath = 'src/files/user/' + file.filename;

    await this.userRepository.update(
      userId, {profileImage: imagePath}
    );

    return;
  }
}
