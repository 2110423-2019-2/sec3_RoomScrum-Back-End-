import { Controller, Body, HttpException, HttpStatus,
  UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express"
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { diskStorage } from "multer";
import createUserDto from "./dto/create-user-dto";

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

  @Post('profile-pic')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/user/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file, 
    @Body('userId') userId 
  ) {
    try {
        await this.userService.uploadPic(file.filename, userId);
        return {
          status: 200,
          message: "OK",
        }
      } catch (err) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
  }
}
