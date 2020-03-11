import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
export enum ContractStatus {
  drafting,
  accepted,
  canceled,
  sent
}

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  contractId: number;

  @Column({ length: 2000 })
  description: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: ContractStatus,
    default: ContractStatus.drafting
  })
  status: string;

  @Column({})
  eventId: number;

  @Column({})
  hireeId: number;

  @Column({type: "datetime"})
  timeStamp: Date;
  // @Column({
  //     type:'set',
  //     length:50 })
  // tag: string[];
}
