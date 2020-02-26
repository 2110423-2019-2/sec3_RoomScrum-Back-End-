import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from 'src/entity/report.entity';
import createReportDto from './dto/report-user-dto';
@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
    ){}
    
    async createReport(Report: createReportDto){
        return this.reportRepository.insert(Report);
    }
}
