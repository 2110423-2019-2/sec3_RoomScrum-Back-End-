import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm";
import { User } from "./user.entity";
import { Application } from "./application.entity";
import { OneToMany } from "typeorm";
import { Contract } from "src/entity/contract.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column({ length: 255 })
  eventName: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ length: 1000 })
  address: string;

  @Column({ length: 255 })
  subdistrict: string;

  @Column({ length: 255 })
  district: string;

  @Column({ length: 255 })
  province: string;

  @Column({ length: 255 })
  country: string;

  @Column({
    type: "char",
    length: 5
  })
  zipcode: string;

  @Column({
    type: "datetime"
  })
  startdatetime: Date;

  @Column({
    type: "datetime"
  })
  enddatetime: Date;

  @Column()
  isCancelled: boolean;


  /////////////////////////////Event image
  @Column({
    nullable: true
  })
  eventImage: string;

  // @Column({
  //     type:'set', })
  // tag: string[];

  @Column()
  userId: number;

  @ManyToOne(
    type => User,
    user => user.event,
    {
      // eager: true,
    }
  )
  @JoinColumn({
    name: "userId", // new name
    referencedColumnName: "userId" // field name in user
  })
  user: User;

  @OneToMany(
    type => Application,
    application => application.event.eventId
  )
  application: Application[];

  @OneToOne(
    type => Contract,
    contract => contract.event,
    { nullable: true }
  )
  contract: Contract;
}
