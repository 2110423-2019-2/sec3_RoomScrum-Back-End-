import { Controller, UseGuards, Post, Body, UsePipes, Req, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { EventInviteDto } from './dto/event.dto';
import { Notification } from 'src/entity/notification.entity';

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
