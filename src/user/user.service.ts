import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { compare, hash } from 'bcrypt';
import createUserDto from "./dto/create-user-dto";
import { Request } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
  find(user: Partial<User>): Promise<User[]> {
    return this.userRepository.find({
      where: user,
    });
  }

  findFromId(id): Promise<User[]> {
    return this.userRepository.find({
      where: //TODO
    })
  }

  async create(user: createUserDto): Promise<any> {
    const hashedPassword = await hash(user.password, 8);
    user.password = hashedPassword;
    return this.userRepository.insert(user);
  }

  async uploadPic(@UploadedFile() file, userId: number): Promise<any> {
    const originalname = file.originalname;
    const filename = file.filename;
    // const response = {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };
    const updatedUser = new User();
    updatedUser.profileImage = 'src/files/user' + file.filename;

    await this.userRepository.update(
      userId, updatedUser
    );

    return;
  }
}
