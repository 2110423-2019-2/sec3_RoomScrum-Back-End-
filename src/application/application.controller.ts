import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  Param,
  Delete,
} from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Application } from "src/entity/application.entity";
import { ApplicationService } from "./application.service";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";
import findMyApplicationDto from "./dto/find-my-application-dto";
import { AuthGuard } from "@nestjs/passport";
import { ApplicationStatus } from "../entity/application.entity";

@Controller("application")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  findAllApplications(): Promise<Application[]> {
    return this.applicationService.findAllApplications();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("event/:id")
  findApplicationByEventId(@Param() params): Promise<Application[]> {
    return this.applicationService.findApplicationByEventId(params.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":eventId/my-application")
  findApplicationById(@Param() params, @Req() req): Promise<Application> {
    console.log(params.eventId,req.user.userId);
    return this.applicationService.findApplicationById(params.eventId,req.user.userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("my-application")
  findMyApplication(@Body() params: findMyApplicationDto, @Req() req): Promise<Application[]> {
    return this.applicationService.findMyApplication(req.user.userId, params);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard("jwt"))
  @Post("apply")
  async applyEvent(@Body() application: applyDto, @Req() req): Promise<any> {
    application.timestamp = new Date();
    application.status = ApplicationStatus.isApplied;
    application.hireeId = req.user.userId;
    try {
      console.log(application);
      await this.applicationService.applyEvent(application);
      return {
        status: 200,
        message: "apply event ok"
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
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

  @UseGuards(AuthGuard("jwt"))
  @Delete("/:eventId/cancel-my-application")
  async cancelMyApplication(@Param() params,@Req() req): Promise<any> {
    try{
      await this.applicationService.cancelMyApplication(req.user.userId, params.eventId);
      return {
        status: 200,
        message: "delete my application ok"
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/:eventId/accept-invitation")
  async acceptEventInvitation(@Param() params, @Req() req): Promise<any> {
    try {
      await this.applicationService.acceptInvitation(req.user.userId, params.eventId);
      return {
        status: 200,
        message: "accept invitation ok",
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
