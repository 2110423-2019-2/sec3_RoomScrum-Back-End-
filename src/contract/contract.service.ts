import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract, ContractStatus } from 'src/entity/contract.entity';
import { Repository } from 'typeorm';
import CreateContractDto from './dto/create-contract-dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>
    ) {}
    
    findContractById(contractId: number): Promise<Contract> {
        return this.contractRepository.findOne({where: {contractId: contractId}});
    }

    async create(eventId: number) {
        return this.contractRepository.save({
            eventId: eventId,
            timeStamp: new Date(),
        });
    }
    

}
