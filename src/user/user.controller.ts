import { Controller, Body, HttpException, HttpStatus, 
  UsePipes, ValidationPipe, Res,
  UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import createUserDto from "./dto/create-user-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { diskStorage } from "multer";

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

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/user',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get('image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/user' });
  }
}
