import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    
    @IsString()
    @IsNotEmpty()
    reportTo: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    topic: string;
}