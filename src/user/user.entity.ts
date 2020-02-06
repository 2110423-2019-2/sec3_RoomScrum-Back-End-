import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
  M = 0, F = 1, O = 2
}

@Entity()
export class User {

    @PrimaryGeneratedColumn({
      type: "integer"
    })
    id: number;
    
    @Column({
      type: "varchar",
      length: 20
    })
    username: string;

    @Column({
        length: 20
    })
    password: string;

    @Column({
        length: 255
    })
    firstName: string;
    
    @Column({
        length: 255
    })
    lastName: string;
    
    @Column({
        type: "char",
        length: 13
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

    @Column({
        length: 50
    })
    email: string;

    @Column({
        type: "char",
        length: 20
    })
    phonenumber: string;

    @Column({
        length: 1000
    })
    address: string;

    @Column()
    subdistrict: string;
    
    @Column()
    district: string;

    @Column()
    city_state: string;

    @Column()
    country: string;

    @Column({
        type: "char",
        length: 5
    })
    zipcode: string;

    @Column({
      // type: "blob",
        type: "string",
        nullable: true
    })
    image_profile: string;

    @Column()
    isMusician: boolean;

    @Column({
        length: 150,
        nullable: true
    })
    bio: string;
    
    @Column({
        length: 50
    })
    tag: string;

    @Column()
    isVerify: boolean;

    @Column({
        // type: "blob"
        type: "string"
    })
    national_card_image: string;

    @Column({
        length: 255
    })
    video_url: string;

    @Column({
        length: 5,
        nullable: true
    })
    hiree_id: number;
}

