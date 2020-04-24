import { Injectable } from '@nestjs/common';
import { Report, ReportStatus } from 'src/entity/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { CreateReportDto } from 'src/report/dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FindReportDto } from './dto/search-report.dto';

@Injectable()
export class ReportService {
    constructor (
        @InjectRepository(Report)
        private readonly reportRepo: Repository<Report>
    ) {}

    
    createReport(reporterUsername: string, reportDetail: CreateReportDto) {
        return this.reportRepo.insert({
            ...reportDetail, // topic, description, offenderUsername
            timestamp: new Date(),
            reportBy: reporterUsername,
        });
    }

    findReport(query: FindReportDto): Promise<Report[]> {
        return this.reportRepo.find(query);
    }

    updateReport(updateReportDto: UpdateReportDto) {
        const {id, newStatus} = updateReportDto;
        return this.reportRepo.update(id, {
            status: newStatus,
        });
    }

}
