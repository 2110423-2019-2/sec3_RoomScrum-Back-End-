import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification, NotificationType, EventInviteInfo} from 'src/entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventInviteDto } from './dto/event.dto';

@Injectable()
export class NotificationService {
    constructor (
        @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
        @InjectRepository(EventInviteInfo) private readonly eventInviteInfoDto: Repository<EventInviteInfo>,
    ) {}


    async debugGetAllNotifications(): Promise<Notification[]> {
        return this.notificationRepo.find()
    }

    async getUserNotification(userId: number): Promise<Notification[]> {
        return this.notificationRepo.find({receiverId: userId});
    }

    // create an event invite notification
    async sendEventInviteNotif(inviterId: number, eventInviteDto: EventInviteDto): Promise<any> {
        const {receiverId, eventId} = eventInviteDto;
        
        const eventInfo = await this.eventInviteInfoDto.save({id: null, eventId, inviterId });
        return this.notificationRepo.insert({
            receiver: {userId: receiverId},
            type: NotificationType.EventInvitation,
            timestamp: new Date(),
            eventInviteInfo: eventInfo,
        })
    }
}
