import { IsString, IsNotEmpty, Length, MinLength, IsEmail, IsISO8601, IsEmpty, IsNumberString, IsDate, IsInt, IsEnum, ValidateIf, IsUrl, IsDateString } from "class-validator";
import { Gender, UserType, MusicianApprovement } from 'src/entity/user.entity';
import { Column } from "typeorm";

class createUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    username: string;
    
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsEnum(UserType)
    userType: UserType;

    ////////////////////////////// Musician Shit
    @ValidateIf(o => (o.userType === UserType.Musician 
        || o.userType === UserType.PremiumMusician))
    @IsNotEmpty()
    @IsString()
    bio: string;

    @ValidateIf(o => (o.userType === UserType.Musician
        || o.userType === UserType.PremiumMusician))
    @IsNotEmpty()
    @IsEnum(MusicianApprovement)
    musicianApprovement: MusicianApprovement;

    @ValidateIf(o => (o.userType === UserType.Musician
        || o.userType === UserType.PremiumMusician))
    @IsUrl()
    videoUrl: string;

    @IsEmpty()
    hireeId: number;
}

export default createUserDto;