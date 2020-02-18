import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Event } from './events.entity';
import { Hiree } from 'src/entity/hiree.entity';

export enum Gender {
  Male = 1, Female = 2, Other = 3
}

export enum UserType {
  Hirer = 'H', PremiumHirer = 'PH', Musician = 'M', PremiumMusician = 'PM', Admin = 'A'
}

export enum MusicianApprovement {
  NotApproved = 'NA', Approved = 'A', Rejected = 'R'
};

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    ////////////////////////////// LOGIN INFORMATION 
    @Column({
      length: 20,
      unique: true,
    })
    username: string;

    @Column({
        length: 255
    })
    password: string;

    ////////////////////////////// NAME
    @Column({
      length: 255
    })
    firstName: string;
    
    @Column({
      length: 255
    })
    lastName: string;
    
    ////////////////////////////// Personal
    @Column({
        type: "char",
        length: 13,
        nullable: true,
        unique: true
    })
    nationalId: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.Other
    })
    gender: Gender;

    @Column({
        type: "date"
    })
    birthdate: Date;

    ////////////////////////////// Contact
    @Column({
      length: 50,
      unique: true
    })
    email: string;

    @Column({
      type: "char",
      length: 10
    })
    phoneNumber: string;

    ////////////////////////////// Addresses
    @Column({
      length: 1000
    })
    address: string;

    @Column({
      length: 255
    })
    subdistrict: string;
    
    @Column({
      length: 255
    })
    district: string;

    @Column({
      length: 255
    })
    cityState: string;

    @Column({
      length: 255
    })
    country: string;

    @Column({
        type: "char",
        length: 5
    })
    zipcode: string;

    ////////////////////////////// Profile Image
    @Column({
        nullable: true
    })
    profileImage: string;

    ////////////////////////////// User Type
    @Column({
      default: UserType.Admin,
      type: "enum",
      enum: UserType,
    })
    userType: UserType;

    ////////////////////////////// Musician Shit
    @Column({
        length: 150,
        nullable: true
    })
    bio: string;

    @Column({
      default: MusicianApprovement.NotApproved,
      type: "enum",
      enum: MusicianApprovement,
      nullable: true
    })
    musicianApprovement: MusicianApprovement;

    @Column({
      length: 255,
      nullable: true
    })
    nationalCardImage: string;

    @Column({
      length: 255,
      nullable: true
    })
    videoUrl: string;


    @OneToOne(type => Hiree, hiree => hiree.user, {cascade: true})
    @JoinColumn()
    hiree: Hiree;

    @OneToMany(type => Event, event => event.user.userId)
    event: Event[];
}

