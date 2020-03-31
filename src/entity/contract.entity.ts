import { Entity, Column, PrimaryColumn } from "typeorm";

enum ContractStatus {
  NotActive = 'NotActive',
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

  @Column({ length: 2000 })
  description: string;

  @Column()
  price: number;

  @Column()
  status: ContractStatus;

  @Column()
  hireeId: number;

  @Column()
  timestamp: Date;

}
