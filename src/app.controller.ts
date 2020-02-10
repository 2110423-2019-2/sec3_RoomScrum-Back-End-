import { Controller, Get, UseGuards, Post, Req, Body, Res, 
  UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user/user.entity";
import { AuthService } from "./auth/auth.service";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, editFileName } from "./utils/file-uploading.utils";
import { diskStorage } from "multer";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(
    @Req() req,
    @Res() res: Response,
    @Body() body: User,
  ) {
    const token = this.authService.sign(req.user);
    res.cookie('token', token);
    res.send({
      ...req.user,
      token,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/status')
  loginStatus(
    @Req() req,
  ) {
    return req.user;
  } 

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploaded_files',
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

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
