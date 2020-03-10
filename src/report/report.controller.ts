import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReportDto } from './dto/create-report.dto';
import { FindReportDto } from './dto/search-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('report')
export class ReportController {
    constructor (
        private readonly reportService: ReportService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    createReport(
        @Req() req,
        @Body() reportInfo: CreateReportDto,
    ) {
        const {userId} = req.user;
        return this.reportService.createReport(userId, reportInfo);
    }

    @Post("/find")
    findReport(
        @Req() req,
        @Body() query: FindReportDto,
    ) {
        return  this.reportService.findReport(query);
    }

    @Post("/:id")
    updateReport(
        @Body() updateReportDto: UpdateReportDto,
    ) {
        return this.reportService.updateReport(updateReportDto);
    }
}
