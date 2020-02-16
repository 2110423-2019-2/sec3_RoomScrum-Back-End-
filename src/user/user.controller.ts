import { Controller, Body, HttpException, HttpStatus,
  UseInterceptors, UploadedFile, Param, UseGuards, Request, Req} from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express"
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { diskStorage } from "multer";
import createUserDto from "./dto/create-user-dto";
import { AuthGuard } from "@nestjs/passport";
// import { request } from "http";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers(): Promise<User[]> {
    return this.userService.find({});
  }

  @Get()
  findUserFromId(@Req() req): Promise<User[]> {
    const id = req.Body.id;
    return this.userService.findFromId(id);
  }

  @Post('create')
  async createUser(
    @Body()
    user: createUserDto
  ): Promise<any> {
    try {
      await this.userService.create(user);
      return {
        status: 200,
        message: 'OK',
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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/user/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProfilePicture( @UploadedFile() file, @Request() req ) {
    try {
        const userId = req.user.userId;
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
