import { IsString, IsNotEmpty, Length, MinLength, IsEmail, IsNumber, IsEmpty } from "class-validator";

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
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    phonenumber: string;
}

export default createUserDto;