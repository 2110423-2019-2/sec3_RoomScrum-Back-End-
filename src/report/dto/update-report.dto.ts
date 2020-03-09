import { IsNumber, IsNotEmpty, IsIn, IsString, IsEnum } from "class-validator";
import { ReportStatus } from "src/entity/report.entity";



export class UpdateReportDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsEnum(ReportStatus)
    @IsNotEmpty()
    newStatus: ReportStatus;
}