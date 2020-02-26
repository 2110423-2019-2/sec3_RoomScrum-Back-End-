import { IsEmpty, IsNumber, IsNotEmpty, IsString } from 'class-validator';

class reportUserDto {
    @IsNotEmpty()
    @IsNumber()
    reportId: number;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    description:string;
}

export default reportUserDto;