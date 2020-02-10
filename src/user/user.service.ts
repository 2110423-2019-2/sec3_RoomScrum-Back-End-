import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { compare, hash } from 'bcrypt';

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

  async create(user: User): Promise<any> {

    const hashedPassword = await hash(user.password, 8);
    user.password = hashedPassword;
    return this.userRepository.insert(user);
  }
}
