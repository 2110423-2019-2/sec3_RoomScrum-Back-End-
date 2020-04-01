import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Contract, ContractStatus } from "src/entity/contract.entity";

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>
    ) { }

    createDummyContract() {
        this.contractRepository.insert({
            eventId: 1,
            description: 'I perform after 4 AM and need food',
            price: 100023.2,
            status: ContractStatus.WaitForStartDrafting,
            hireeId: 1,
            timestamp: new Date()
        })
    }
    

    async getDetailContractById() : Promise<Contract>
    {
        return await this.contractRepository
                .createQueryBuilder('Contract')
                .where('contract.eventId = :eventId', {eventId:1})
                .getOne();
    }
}