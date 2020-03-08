import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification, NotificationType, EventInviteInfo, BandInviteInfo} from 'src/entity/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventInviteDto } from './dto/event.dto';
import { BandInviteDto } from './dto/band.dto';

@Injectable()
export class NotificationService {
    constructor (
        @InjectRepository(Notification) private readonly notificationRepo: Repository<Notification>,
        @InjectRepository(EventInviteInfo) private readonly eventInviteInfoRepo: Repository<EventInviteInfo>,
        @InjectRepository(BandInviteInfo) private readonly bandInviteRepo: Repository<BandInviteInfo>,
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

    async sendBandInviteNotif(inviterId: number, bandInviteDto: BandInviteDto): Promise<any> {
        const {receiverId} = bandInviteDto;
        const bandInviteInfo = await this.bandInviteRepo.save({id: null, inviterId });
        return this.notificationRepo.insert({
            receiver: {userId: receiverId},
            type: NotificationType.BandInvitation,
            timestamp: new Date(),
            bandInviteInfo: bandInviteInfo,
        })
    }
}
