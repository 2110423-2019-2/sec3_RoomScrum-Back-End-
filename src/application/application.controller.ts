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
import { AuthGuard } from "@nestjs/passport";
import { Status } from "../entity/application.entity";

@Controller("application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get("apply")
  findAllApplications(): Promise<Application[]> {
    return this.applicationService.findAllApplications();
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  @Post("apply")
  async applyEvent(@Body() application: applyDto, @Req() req): Promise<any> {
    try {
      application.status = Status.isApplied;
      application.hireeId = req.user.userId;
      console.log(application);
      await this.applicationService.apply(application);
      return {
        status: 200,
        message: "apply event ok"
      };
    } catch (err) {
      console.log(err);
      throw new HttpException("Duplicate data", HttpStatus.BAD_REQUEST);
    }
  }
}
