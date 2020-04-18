import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './events.entity';
import { Contract } from './contract.entity';

export enum NotificationType {
    ApplicationAccepted = 'ApplicationAccepted',
    ContractSent = 'ContractSent',
    ContractCancelledByHirer = 'ContractCancelledByHirer',
    ContractCancelledByMusician = 'ContractCancelledByMusician',
    ContractAccepted = 'ContractAccepted',
    ContractRejected = 'ContractRejected',
    MusicianApplied = 'MusicianApplied',
    EventCancelled = 'EventCancelled',
    EventCompleted = 'EventCompleted',
    NewReview = 'NewReview',
    InvitationReceived = 'InvitationReceived',
    ApplicationRejected = 'ApplicationRejected',
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
    type: string;

    // person who receive notification
    @Column()
    receiverId: number;


    @ManyToOne(type => User, user => user.userId, {eager: true})
    @JoinColumn({
        name: "receiverId",
        referencedColumnName: "userId",
    })
    receiver: User;

    // sender (maybe hirer or hiree depend on which side is receiver)
    @ManyToOne(type => User, user => user.userId, {eager: true})
    @JoinColumn({
        name: "senderId",
        referencedColumnName: "userId",
    })
    sender: User;

    @Column()
    senderId: number;

    // event
    @ManyToOne(type => Event, event => event.eventId, {eager: true})
    @JoinColumn({
        name: "eventId",
        referencedColumnName: "eventId",
    })
    event: Event;

    @Column()
    eventId: number;
}


