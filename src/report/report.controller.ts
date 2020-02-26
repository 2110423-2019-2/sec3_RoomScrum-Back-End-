import { Controller, UseGuards, UsePipes, Body, Req, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { Get, Post, Put } from '@nestjs/common';
import reportUserDto from 'src/report/dto/report-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { ReportService } from './report.service';

@Controller("report")
export class ReportController {
    constructor(private readonly reportService: ReportService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post()
    async createReport(@Body() report: reportUserDto, @Req() req): Promise<any> {
        try{
            await this.reportService.createReport(report);
            return {
                status: 200,
                message: 'report user ok'
            } 
        } catch(err) {
            // if (err.errno === 1062){
            //     throw new HttpException('event id error', HttpStatus.BAD_REQUEST);
            // } else {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            // }
        }
    }
}
