import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification, NotificationType, EventInviteInfo, BandInviteInfo, EventStateUpdateInfo} from 'src/entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventInviteDto, EventStateUpdateDto } from './dto/event.dto';

@Injectable()
export class NotificationService {
    constructor (
        @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
        @InjectRepository(EventInviteInfo) private readonly eventInviteInfoRepo: Repository<EventInviteInfo>,
        @InjectRepository(BandInviteInfo) private readonly bandInviteRepo: Repository<BandInviteInfo>,
        @InjectRepository(EventStateUpdateInfo) private readonly eventStateUpdateRepo: Repository<EventStateUpdateInfo>,
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
        
        const eventInfo = await this.eventInviteInfoRepo.save({id: null, eventId, inviterId });
        return this.notificationRepo.insert({
            receiver: {userId: receiverId},
            type: NotificationType.EventInvitation,
            timestamp: new Date(),
            eventInviteInfo: eventInfo,
        })
    }

    async sendEventStateUpdateNotif(eventStateUpdateDto: EventStateUpdateDto): Promise<any> {
        const {updateType, eventId, receiverId} = eventStateUpdateDto;
        
        const eventUpdateInfo = await this.eventStateUpdateRepo.save({id: null, updateType, eventId });
        return this.notificationRepo.insert({
            receiver: {userId: receiverId},
            type: NotificationType.EventStateUpdate,
            timestamp: new Date(),
            eventStateUpdateInfo: eventUpdateInfo,
        })
    }
}
