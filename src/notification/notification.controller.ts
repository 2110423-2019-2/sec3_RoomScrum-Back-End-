import { Controller, UseGuards, Post, Body, UsePipes, Req, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { Notification, NotificationType } from 'src/entity/notification.entity';
import { EventUpdateDto } from './dto/test.notification';

@Controller('notification')
export class NotificationController {
    constructor (
        private readonly notificationService: NotificationService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("/event-invite-notif")
    sendEventInviteNotif(
        @Body() eventInviteDto: {receiverId: number, eventId: number},
        @Req() req,
    ) {
        const {userId} = req.user;
        return this.notificationService.createNotification({
            type: NotificationType.InvitationReceived,
            senderId: userId,
            eventId: eventInviteDto.eventId,
            receiverId: eventInviteDto.receiverId,
        });
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/event-update-notif")
    sendEventStateUpdateNotif(
        @Body() eventUpdateDto: EventUpdateDto,
        @Req() req,
    ) {
        let type: string;
        switch (eventUpdateDto.updateType) {
            case "ACCEPT": type = NotificationType.ApplicationAccepted; break;
            case "CANCEL": type = NotificationType.EventCancelled; break;
            case "COMPLETE": type = NotificationType.EventCompleted; break;
            case "REJECT": type = NotificationType.ApplicationRejected; break;
        }

        console.log("Create type =", eventUpdateDto.updateType);

        return this.notificationService.createNotification({
            eventId: eventUpdateDto.eventId,
            type: type,
            receiverId: eventUpdateDto.receiverId,
            senderId: req.user.userId,
        });
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
