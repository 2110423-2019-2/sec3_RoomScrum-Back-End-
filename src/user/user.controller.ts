import { Controller, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import createUserDto from "./dto/create-user-dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.find({});
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(
    @Body()
    user: createUserDto
  ): Promise<any> {
    try {
      await this.userService.create(user);
      return {
        status: 200,
        message: "OK",
      }
    } catch (err) {
      if (err.errno === 1062){
        throw new HttpException('username already exists', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      }
    }
  }
}
