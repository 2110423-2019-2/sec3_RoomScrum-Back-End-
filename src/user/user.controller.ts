import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  Request,
  Req,
  Res,
  ValidationPipe,
  UsePipes
} from "@nestjs/common";
import { Post, Get } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { diskStorage } from "multer";
import { AuthGuard } from "@nestjs/passport";
import createUserDto from "./dto/create-user-dto";
import searchUserDto from "./dto/find-user-dto";
import updateUserDto from "./dto/update-user-dto";
// import { request } from "http";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  findAllUsers(): Promise<User[]> {
    return this.userService.find({});
  }

  @Get(":id")
    async findUserById(@Param() params): Promise<User> {
        return (await this.userService.findUserById(params.id))[0];
    }

  @Post("find-by-username")
  findUserFromUsername(@Body() searchParam: searchUserDto): Promise<User[]> {
    return this.userService.findFromUsername(searchParam.username);
  }

  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @Post("update/")
  async updateProfile(@Body() user: updateUserDto, @Req() req, @Param() params): Promise<any> {
        try {
            const userId : number =  req.user.userId;
            await this.userService.updateProfile(userId, user);
            return {
                status: 200,
                message: "Update Profile OK"
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
  }  
  
  @Post("create")
  async createUser(
    @Body()
    user: createUserDto
  ): Promise<any> {
    try {
      await this.userService.create(user);
      return {
        status: 200,
        message: "ok"
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("temp-profile-pic")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files/user/",
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadTempProfile(@UploadedFile() file) {
    try {
      return { imageName: file.filename };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("temp-id-pic")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files/id-card/",
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadTempIdCard(@UploadedFile() file) {
    try {
      return { imageName: file.filename };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("profile-pic")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files/user",
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadProfilePicture(@UploadedFile() file, @Request() req) {
    try {
      const userId = req.user.userId;
      await this.userService.uploadProfilePic(file, userId);
      return {
        status: 200,
        message: "OK"
      };
    } catch (err) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }

  @Get("profile-pic/:id")
  async getProfilePicture(@Param("id") userId: number, @Res() res) {
    try {
      const imgPath = await this.userService.getProfilePicPath(userId);
      return res.sendFile(imgPath, { root: "./files/user" });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("id-card-pic")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files/id-card/",
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadIdPicture(@UploadedFile() file, @Request() req) {
    try {
      const userId = req.user.userId;
      await this.userService.uploadIdPic(file, userId);
      return {
        status: 200,
        message: "OK"
      };
    } catch (err) {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }

  @Get("id-card-pic/:id")
  async getIdPicture(@Param("id") userId: number, @Res() res) {
    try {
      const imgPath = await this.userService.getIdPicPath(userId);
      return res.sendFile(imgPath, { root: "./files/id-card" });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
