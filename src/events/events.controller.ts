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
  Req,
  Request,
} from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Event, EventStatus } from "src/entity/events.entity";
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

  @Get("all")
  findAllEvents(): Promise<Event[]> {
    return this.eventsService.findAllEvent();
  }

  @Get()
  findAvailableEvents(): Promise<Event[]> {
    return this.eventsService.findAvailableEvent();
  }

  @Get(":id")
  async findEventByEventId(@Param() params): Promise<Event> {
    return (await this.eventsService.findEventByEventId(params.id))[0];
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("find-by-hirerId/:id")
  async findEventByHirerId(@Param() params): Promise<Event[]> {
    return await this.eventsService.findEventByHirerId(params.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("find-my-event")
  async findMyEvent(@Request() req): Promise<Event[]> {
    const hirerId = req.user.userId;
    return await this.eventsService.findEventByHirerId(hirerId);
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
        message: "Create Event OK"
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @UsePipes(new ValidationPipe())
  @Post("update/:id")
  async updateEvent(@Body() event: createEventDto, @Param() params): Promise<any> {
    try {
      await this.eventsService.updateEvent(params.id, event);
      return {
        status: 200,
        message: "Update Event OK"
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("cancel/:id")
  cancelEvent(@Param() params) {
    try {
      this.eventsService.cancelEvent(params.id);
      return { status: 200, message: `Cancel Event No. ${params.id}`}
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("event-pic/:eventId")
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
  async uploadEventPicture(@UploadedFile() file, @Param() params,@Req() req) {
    try {
      await this.eventsService.uploadEventPic(file, params.eventId);
      return {
        status: 200,
        message: "OK"
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id/pic")
  async getEventPicture(@Param("id") userId: number, @Res() res) {
    try {
      // const userId = req.body.userId;
      const imgPath = await this.eventsService.getEventPicName(userId);
      return res.sendFile(imgPath, { root: "./files/event" });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/debug')
  async debug(@Body() input) :Promise<any> {
    try {
      return null;
    } catch (err)
    {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  //TODO check member of event
  @UseGuards(AuthGuard("jwt"))
  @Get("/receive-payment/:id")
  async receivePayment(@Param('id') eventId)
  {
    try {
      await this.eventsService.receivePayment(eventId);
      return {
        status: 200,
        message: "Update Event OK"
      }
    } catch (err)
    {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
