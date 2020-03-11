import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Event } from "src/entity/events.entity";

export enum ContractStatus {
  Drafting = "Drafting",
  Accepted = "Accepted",
  Canceled = "Canceled",
  Sent = "Sent"
}

@Entity()
export class Contract {
  @PrimaryColumn()
  eventId: number;

  @Column({ length: 2000 })
  description: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: ContractStatus,
    default: ContractStatus.Drafting
  })
  status: string;

  @Column({type: "datetime"})
  timeStamp: Date;

  @OneToOne(
    type => Event,
    event => event.contract,
    { nullable: false }
  )
  @JoinColumn({
    name: "eventId",
    referencedColumnName: "eventId"
  })
  event: Event;

}
