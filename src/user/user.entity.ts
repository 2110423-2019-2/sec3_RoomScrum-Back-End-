import { Entity, Column } from "typeorm";

@Entity()
export class User {

  @Column({ length: 63, primary: true })
  username: string;

  @Column({ length: 255 })
  password: string;
}
