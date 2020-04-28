import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from "src/entity/contract.entity";
import { User } from 'src/entity/user.entity';
import { Application } from 'src/entity/application.entity';
import { Event } from 'src/entity/events.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    providers: [ContractService],
    imports: [
        TypeOrmModule.forFeature([Contract,User,Application,Event]),
        NotificationModule,
    ],
    controllers: [ContractController]
})
export class ContractModule { }
