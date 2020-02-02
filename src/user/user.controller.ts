import { Controller, Body } from "@nestjs/common";
import { Request, Post, Get } from "@nestjs/common";
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
  createUser(
    @Body()
    user: User
  ): Promise<User> {
    return this.userService.create(user);
  }
}
