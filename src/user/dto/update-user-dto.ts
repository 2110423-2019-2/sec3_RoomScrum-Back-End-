import {
    IsOptional,
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

class updateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(8)
    username: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    @Length(13)
    @IsNumberString()
    nationalId: string;

    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    @IsISO8601()
    birthdate: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumberString()
    phoneNumber: string;

    ////////////////////////////// Addresses
    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    subdistrict: string;

    @IsOptional()
    @IsString()
    district: string;

    @IsOptional()
    @IsString()
    cityState: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    @Length(5)
    zipcode: string;

    ////////////////////////////// User Type
    // @IsNotEmpty()
    @IsEmpty()
    userType: UserType;

    ////////////////////////////// Musician Shit
    @ValidateIf(
        o =>
            o.userType === UserType.Musician || o.userType === UserType.Band
    )
    @IsOptional()
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
    @IsOptional()
    videoUrl: string;
}

export default updateUserDto;
