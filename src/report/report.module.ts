import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/entity/report.entity';

@Module({
  providers: [ReportService],
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportController]
})
export class ReportModule {}
