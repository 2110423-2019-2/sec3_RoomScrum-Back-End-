import { Controller, Body, HttpException, HttpStatus } from "@nestjs/common";
import { Get, Post, Put } from '@nestjs/common';
import { Application } from './application.entity';
import { ApplicationService} from './application.service';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    
    @Get('apply')
    findAllApplications(): Promise<Application[]> {
        return this.applicationService.findAllApplications();
    }

    @Post('apply')
    async applyEvent(@Body() application: Application): Promise<any> {
        try{
            return await this.applicationService.apply(application);
        } catch(err) {
            throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
        }
    }
}
