import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract, ContractStatus } from 'src/entity/contract.entity';
import { Repository, Timestamp } from 'typeorm';
import CreateContractDto from 'src/contract/dto/create-contract-dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>
    ) {}
    
    findContractById(contractId: number): Promise<Contract> {
        return this.contractRepository.findOneOrFail({where: {contractId: contractId}});
    }

    async createContract(contract: CreateContractDto) {
        // TODO delete this
        contract.price = 1000;
        contract.description = "This is default contract | The hiree should abide what hirer demand, The hirer should respect hiree";
        contract.status = ContractStatus.Drafting;
        return this.contractRepository.insert({
            ...contract,
            timeStamp: new Date()
        });
    }
    //TODO impolement
    acceptContract(contractId: number) {
        return this.contractRepository.update({eventId: contractId}, {status: ContractStatus.Accepted});
    }
    //TODO impolement
    rejectContract(contractId: number) {
        return this.contractRepository.update({ eventId: contractId }, { status: ContractStatus.Rejected});
    }
    //TODO impolement
    cancelContract(contractId: number) {
        // cancel event
        return this.contractRepository.update({ eventId: contractId }, { status: ContractStatus.Canceled});
    }
    

}
