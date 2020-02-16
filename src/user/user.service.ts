import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entity/user.entity";
import { compare, hash } from 'bcrypt';
import createUserDto from "./dto/create-user-dto";

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

  async create(user: createUserDto): Promise<any> {
    const hashedPassword = await hash(user.password, 8);
    user.password = hashedPassword;
    return this.userRepository.insert(user);
  }

  async uploadPic(@UploadedFile() file): Promise<any> {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}
