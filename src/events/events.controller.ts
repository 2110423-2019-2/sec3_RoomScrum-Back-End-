import {
  Controller,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Res,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Event } from "src/entity/events.entity";
import { EventsService } from "./events.service";
import createEventDto from "./dto/create-event-dto";
import searchEventDto from "./dto/search-event-dto";
import { AuthGuard } from "@nestjs/passport";
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAllEvents(): Promise<Event[]> {
    return this.eventsService.findAllEvent();
  }

  @Post("search")
  advanceSearch(@Body() searchParams: searchEventDto): Promise<Event[]> {
    return this.eventsService.advanceSearch(
      searchParams.searchType,
      searchParams.value
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @Post()
  async createEvent(@Body() event: createEventDto, @Req() req): Promise<any> {
    event.user = {
      userId: req.user.userId
    };
    try {
      await this.eventsService.create(event);
      return {
        status: 200,
        message: "create event ok"
      };
    } catch (err) {
      // if (err.errno === 1062){
      //     throw new HttpException('event id error', HttpStatus.BAD_REQUEST);
      // } else {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      // }
    }
  }

  @Post("pic")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files/event/",
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadEventPicture(@UploadedFile() file, @Req() req) {
    try {
      return { imageName: file.filename };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("pic/:id")
  async getEventPicture(@Param("id") userId: number, @Res() res) {
    try {
      // const userId = req.body.userId;
      const imgPath = await this.eventsService.getEventPicName(userId);
      return res.sendFile(imgPath, { root: "./files/event" });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
