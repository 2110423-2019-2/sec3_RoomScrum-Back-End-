import { IsString, IsNotEmpty, IsEmpty, IsDateString } from "class-validator";
import { User } from "../../entity/user.entity";
import { Status } from "src/entity/events.entity";
class createEventDto {
  // @IsNotEmpty()
  // @IsNumber()
  @IsEmpty()
  eventId: number;

  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subdistrict: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  zipcode: string;

  // @IsNotEmpty()
  // @IsString()
  // tag: string[]

  @IsNotEmpty()
  @IsDateString()
  startdatetime: Date;

  @IsNotEmpty()
  @IsDateString()
  enddatetime: Date;

  isCancelled: boolean
  status: Status

  // @IsEmpty()
  // @IsNumber()
  user: Partial<User>;
  // user: Number;

  @IsNotEmpty()
  @IsString()
  eventImage: string;

}

export default createEventDto;
