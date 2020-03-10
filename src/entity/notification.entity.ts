import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './events.entity';
import { eventUpdateTypes } from 'src/notification/dto/event.dto';

export enum NotificationType {
    EventInvitation = 1,
    EventStateUpdate = 2, 

    BandInvitation = 11,
}


@Entity()
export class EventInviteInfo {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    inviterId: number;
    
    @ManyToOne(type => User, {eager: true}) // so that frontend don't have to query user
    @JoinColumn({
        name: "inviterId",
        referencedColumnName: "userId",
    })
    inviter: User;



    @Column()
    eventId: number;

    @ManyToOne(type => Event, event => event.eventName, {eager: true}) // so that frontend don't have to query event
    @JoinColumn({
        name: "eventId",
        referencedColumnName: "eventId",
    })
    event: Event;
}

@Entity()
export class EventStateUpdateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: eventUpdateTypes,
    })
    updateType: string;

    @Column()
    eventId: number;

    @ManyToOne(type => Event, {eager: true})
    @JoinColumn({
        name: "eventId",
        referencedColumnName: "eventId",
    })
    event: Event;

    
    // @Column()
    // userId: number;

    // @ManyToOne(type => User)
    // @JoinColumn({
    //     name: "userId",
    //     referencedColumnName: "userId",
    // })
    // user: User;
}


@Entity()
export class BandInviteInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inviterId: number;
    
    @ManyToOne(type => User, {eager: true}) // so that frontend don't have to query user
    @JoinColumn({
        name: "inviterId",
        referencedColumnName: "userId",
    })
    inviter: User;


    // todo wait for band ?

    // @Column()
    // bandId: number;

    // @ManyToOne(type => Band, event => event.eventName, {eager: true}) // so that frontend don't have to query event
    // @JoinColumn({
    //     name: "eventId",
    //     referencedColumnName: "eventId",
    // })
    // event: Event;
}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    notifId: number;

    @Column({
        type: "datetime",
    })
    timestamp: Date

    @Column({
        type: "enum",
        enum: NotificationType,
        nullable: false,
    })
    type: number;

    // person who receive notification
    @Column()
    receiverId: number;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "receiverId",
        referencedColumnName: "userId",
    })
    receiver: User;


    @OneToOne(type => EventInviteInfo, evtInfo => evtInfo.id, {eager: true})
    @JoinColumn()
    eventInviteInfo: EventInviteInfo;
    
    @OneToOne(type => BandInviteInfo, bandInfo => bandInfo.id, {eager: true})
    @JoinColumn()
    bandInviteInfo: BandInviteInfo;

    @OneToOne(type => EventStateUpdateInfo, evtInfo => evtInfo.id, {eager: true})
    @JoinColumn()
    eventStateUpdateInfo: EventStateUpdateInfo;
}


