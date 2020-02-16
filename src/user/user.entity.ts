import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

export enum Gender {
  M = 0, F = 1, O = 2
}

export enum UserType {
  H = 'H', PH = 'PH', M = 'M', PM = 'PM', A = 'A'
}

export enum MusicianApprovement {
  NA = 'NA', A = 'A', R = 'R'
};

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Column({
      primary: true,
      type: "integer",
    })
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
    })
    national_id: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.O
    })
    gender: Gender;

    @Column({
        type: "date"
    })
    birthdate: string;

    ////////////////////////////// Contact
    @Column({
      length: 50
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
    city_state: string;

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
      default: UserType.A,
      type: "enum",
      enum: UserType,
    })
    userType: string;

    ////////////////////////////// Musician Shit
    @Column({
        length: 150,
        nullable: true
    })
    bio: string;

    @Column({
      default: MusicianApprovement.NA,
      type: "enum",
      enum: MusicianApprovement,
      nullable: true
    })
    musicianApprovement: string;

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

    //TODO change to many-to-one
    @Column({
      nullable: true
    })
    hireeId: number;
}

