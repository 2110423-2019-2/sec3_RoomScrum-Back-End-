import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from "src/entity/contract.entity";

@Module({
    providers: [ContractService],
    imports: [
        TypeOrmModule.forFeature([Contract,])
    ],
    controllers: [ContractController]
})
export class ContractModule { }
