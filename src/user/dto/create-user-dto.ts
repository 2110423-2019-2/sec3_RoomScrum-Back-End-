import {
  IsString,
  IsNotEmpty,
  Length,
  MinLength,
  IsEmail,
  IsISO8601,
  IsEmpty,
  IsNumberString,
  IsEnum,
  ValidateIf
} from "class-validator";
import { Gender, UserType, MusicianApprovement } from "src/entity/user.entity";

class createUserDto {
  // @IsNotEmpty()
  @IsString()
  @MinLength(8)
  username: string;

  // @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(13)
  @IsNumberString()
  nationalId: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsISO8601()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  ////////////////////////////// Addresses
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
  cityState: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(5)
  zipcode: string;

  ////////////////////////////// User Type
  // @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;

  ////////////////////////////// Musician Shit
  @ValidateIf(
    o =>
      o.userType === UserType.Musician || o.userType === UserType.Band
  )
  @IsString()
  bio: string;

  @ValidateIf(
    o =>
      o.userType === UserType.Musician || o.userType === UserType.Band
  )
  @IsEmpty()
  musicianApprovement: MusicianApprovement;

  @ValidateIf(
    o =>
      o.userType === UserType.Musician || o.userType === UserType.Band
  )
  videoUrl: string;
}

export default createUserDto;
