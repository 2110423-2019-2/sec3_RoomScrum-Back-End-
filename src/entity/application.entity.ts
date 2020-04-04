import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./events.entity";
import { User } from "./user.entity";
export enum ApplicationStatus {
  isInvited = "isInvited",
  isApplied = "isApplied",
  applicationRejected = "applicationRejected",
  isAccepted = "isAccepted",
}

@Entity()
export class Application {
  //This is a table for map event_id -> user_id
  @Column({ primary: true })
  eventId: number;

  @Column({ primary: true })
  hireeId: number;

  @Column({
    type: "datetime"
  })
  timestamp: Date;

  @Column({
    type: "enum",
    enum: ApplicationStatus,
    default: ApplicationStatus.isApplied
  })
  status: ApplicationStatus;

  @ManyToOne(
    type => Event,
    event => event.application
  )
  @JoinColumn({
    name: "eventId", // new name
    referencedColumnName: "eventId" // field name in user
  })
  event: Event;

  @ManyToOne(
    type => User,
    hiree => hiree.application,
    {
      eager: true,
    }
  )
  @JoinColumn({
    name: "hireeId",
    referencedColumnName: "userId"
  })
  hiree: User;
}
