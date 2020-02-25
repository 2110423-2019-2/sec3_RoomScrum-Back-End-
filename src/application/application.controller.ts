import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
  Req
} from "@nestjs/common";
import { Get, Post, Put } from "@nestjs/common";
import { Application } from "src/entity/application.entity";
import { ApplicationService } from "./application.service";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";
import { AuthGuard } from "@nestjs/passport";
import { Status } from "../entity/application.entity";

@Controller("application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  findAllApplications(): Promise<Application[]> {
    return this.applicationService.findAllApplications();
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("event")
  findApplicationById(@Body() eventId: number): Promise<Application[]> {
    return this.applicationService.findApplicationById(eventId);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  @Post("apply")
  async applyEvent(@Body() application: applyDto, @Req() req): Promise<any> {
    application.status = Status.isApplied;
    application.hireeId = req.user.userId;
    try {
      // application.status = Status.isApplied;
      // application.hireeId = req.user.userId;
      console.log(application);
      await this.applicationService.applyEvent(application);
      return {
        status: 200,
        message: "apply event ok"
      };
    } catch (err) {
      console.log(err);
      throw new HttpException("Duplicate data", HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("accept")
  async acceptMusician(@Body() application: acceptMusicianDto): Promise<any> {
    try {
      await this.applicationService.acceptUser(application);
      return {
        status: 200,
        message: "accept musician ok"
      };
    } catch (err) {
      throw new HttpException("IDK", HttpStatus.BAD_REQUEST);
    }
  }
}
