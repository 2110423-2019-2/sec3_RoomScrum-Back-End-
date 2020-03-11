import { Controller, UseGuards, Post, Body, UsePipes, Req, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { EventInviteDto, EventStateUpdateDto } from './dto/event.dto';
import { Notification } from 'src/entity/notification.entity';
import { BandInviteDto } from './dto/band.dto';

@Controller('notification')
export class NotificationController {
    constructor (
        private readonly notificationService: NotificationService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("/event-invite-notif")
    sendEventInviteNotif(
        @Body() eventInviteDto: EventInviteDto,
        @Req() req,
    ) {
        const {userId} = req.user;
        return this.notificationService.sendEventInviteNotif(userId, eventInviteDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/band-invite-notif")
    sendBandInviteNotif(
        @Body() bandInviteDto: BandInviteDto,
        @Req() req,
    ) {
        const {userId} = req.user;
        return this.notificationService.sendBandInviteNotif(userId, bandInviteDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/event-update-notif")
    sendEventStateUpdateNotif(
        @Body() eventStateUpdateDto: EventStateUpdateDto,
    ) {
        return this.notificationService.sendEventStateUpdateNotif(eventStateUpdateDto);
    }

    @Get("/all")
    debugGetAllNotif(): Promise<Notification[]> {
        return this.notificationService.debugGetAllNotifications();
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/")
    getMyNotif(
        @Req() req,
    ): Promise<Notification[]> {
        const userId = req.user.userId;
        console.log("get notification for user -> ", userId);
        return this.notificationService.getUserNotification(userId);
    }

}
