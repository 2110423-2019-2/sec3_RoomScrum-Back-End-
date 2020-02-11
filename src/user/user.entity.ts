import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { Contains, IsInt, Length, IsEmail, IsDate, Min, Max, 
  Matches, IsString, IsPhoneNumber } from "class-validator";

export enum Gender {
  M = 0, F = 1, O = 2
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Column({
      primary: true,
      type: "integer",
    })
    id: number;
    
    @Column({
      type: "varchar",
      length: 20,
      unique: true,
    })
    @Matches( /^[a-z0-9_-]{3,15}$/ )
    username: string;

    @Column({
        length: 255
    })
    @IsString()
    password: string;

    @Column({
        length: 255
    })
    @IsString()
    firstName: string;
    
    @Column({
        length: 255
    })
    lastName: string;
    
    // @Column({
    //     type: "char",
    //     length: 13
    // })
    // national_id: string;

    // @Column({
    //     type: "enum",
    //     enum: Gender,
    //     default: Gender.O
    // })
    // gender: Gender;

    // @Column({
    //     type: "date"
    // })
    // birthdate: string;

    @Column({
        length: 50
    })
    @IsEmail()
    email: string;

    @Column({
        type: "char",
        length: 20
    })
    @IsPhoneNumber('TH')
    phonenumber: string;

    // @Column({
    //     length: 1000
    // })
    // address: string;

    // @Column()
    // subdistrict: string;
    
    // @Column()
    // district: string;

    // @Column()
    // city_state: string;

    // @Column()
    // country: string;

    // @Column({
    //     type: "char",
    //     length: 5
    // })
    // zipcode: string;

    // @Column({
    //     nullable: true
    // })
    // image_profile: string;

    // @Column()
    // isMusician: boolean;

    // @Column({
    //     length: 150,
    //     nullable: true
    // })
    // bio: string;
    
    // @Column({
    //     length: 50
    // })
    // tag: string;

    // @Column()
    // isVerify: boolean;

    // @Column()
    // national_card_image: string;

    // @Column({
    //     length: 255
    // })
    // video_url: string;

    @Column({
        nullable: true
    })
    hiree_id: number;
}

