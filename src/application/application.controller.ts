import { Controller, Body, HttpException, HttpStatus,
    UsePipes, ValidationPipe, Res, UseGuards,
    UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { Get, Post, Put } from '@nestjs/common';
import { Application } from 'src/entity/application.entity';
import { ApplicationService} from './application.service';
import applyDto from './dto/apply-dto';
import { AuthGuard } from "@nestjs/passport";

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    
    @Get('apply')
    findAllApplications(): Promise<Application[]> {
        return this.applicationService.findAllApplications();
    }

    @UsePipes(new ValidationPipe())
    // @UseGuards(AuthGuard('jwt'))
    @Post('apply')
    async applyEvent(@Body() application: applyDto): Promise<any> {
        try{
            return await this.applicationService.apply(application);
        } catch(err) {
            throw new HttpException('Duplicate data', HttpStatus.BAD_REQUEST);
        }
    }
}
