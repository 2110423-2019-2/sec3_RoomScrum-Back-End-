import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, createQueryBuilder } from "typeorm";
import { Contract, ContractStatus } from "src/entity/contract.entity";
import { User } from "src/entity/user.entity";
import { eventNames } from "cluster";

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>
    ) { }

    async createDummyContract() {

        const hiree: User = <User> await createQueryBuilder('user')
            .where('user.userType = :type', {type: 'Musician'})
            .getOne();

        this.contractRepository.insert({
            eventId: 1,
            description: 'I perform after 4 AM and need food',
            price: 100023.2,
            status: ContractStatus.WaitForStartDrafting,
            hireeId: hiree.userId,
            timestamp: new Date()
        })
    }


    async getDetailContractById(eventId: number) : Promise<any>
    {
        const contract = <any>await this.contractRepository
            .createQueryBuilder('Contract')
            .where('contract.eventId = :eventId', { eventId: 1 })
            .getOne();
        contract.event = { 'eventName': 'event number 1'};
        contract.hirer = { 'userId':1,'firstName': 'musician first', 'lastName':'musiciain last'};
        contract.musician = {'firstName':'musician first', 'lastName':'musiciain last'};

        return contract;
    }
}