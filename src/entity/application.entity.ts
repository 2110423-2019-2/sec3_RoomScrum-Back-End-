import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./events.entity";
import { Hiree } from "./hiree.entity";
export enum Status {
  default = 1,
  isInvited = 2,
  isApplied = 3,
  areAccepted = 4
}

@Entity()
export class Application {
  //This is a table for map event_id -> hiree_id
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
    enum: Status,
    default: Status.default
  })
  status: Status;

  @ManyToOne(
    type => Event,
    event => event.application
  )
  @JoinColumn({
    name: "eventId", // new name
    referencedColumnName: "eventId" // field name in application
  })
  event: Event;

  @ManyToOne(type => Hiree, hiree => hiree.application, )
  @JoinColumn({
      name: "hireeId", // new name
      referencedColumnName: "hireeId", // field name in application
  })
  hiree: Hiree;
}
