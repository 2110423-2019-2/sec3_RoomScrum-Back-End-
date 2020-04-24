import { IsOptional, IsNumber, IsEnum } from "class-validator";
import { ReportStatus } from "src/entity/report.entity";


export class FindReportDto {
    @IsOptional()
    @IsNumber()
    // @IsOptional()
    id: number;

    // @IsEnum(ReportStatus)
    @IsOptional()
    status: ReportStatus
}