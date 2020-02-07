import { Controller, Body, HttpException, HttpStatus } from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.find({});
  }

  @Post()
  async createUser(
    @Body()
    user: User
  ): Promise<any> {
    try {
      return await this.userService.create(user);
    } catch (err) {
      console.log(err);
      if (err !== 1062){
        throw new HttpException('username already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      }
    }
  }
}
