import { Entity, Column, PrimaryColumn, OneToOne, JoinTable } from "typeorm";
import { Event } from 'src/entity/events.entity';
import { User } from 'src/entity/user.entity';

export enum ContractStatus {
  NotActive = 'NotActive',
  WaitForStartDrafting = 'WaitForStartDrafting',
  Drafting = 'Drafting',
  Accepted = 'Accept',
  Cancelled = 'Cancelled',
  Rejected = 'Rejected',
  Sent = 'Sent'
}

@Entity()
export class Contract {
  @PrimaryColumn()
  eventId: number;

  @OneToOne(type=>Event, event => event.contract)
  event: Event;

  @Column({ length: 2000 })
  description: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.NotActive,
  })
  status: string;
  
  @Column()
  hireeId: number;

  @Column()
  timestamp: Date;

}

/*
{
  eventId:1,
  
}
*/
