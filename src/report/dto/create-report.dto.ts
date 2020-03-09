import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    
    @IsNumber()
    @IsNotEmpty()
    offenderId: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}