import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, createQueryBuilder } from "typeorm";
import { Contract, ContractStatus } from "src/entity/contract.entity";
import { User } from "src/entity/user.entity";
import { Event } from 'src/entity/events.entity'
import { UpdateContractDto } from "./dto/update-contract-dto";
import { Application } from "src/entity/application.entity";


@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,

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
            timeStamp: new Date()
        })
    }

    // HACK
    async getDetailContractById(eventId: number) : Promise<any>
    {
        // hirerId hirerName hireeName eventName
        const contract: Contract = await this.contractRepository
            .createQueryBuilder('contract')
            .innerJoinAndSelect('contract.event','event')
            .where('contract.eventId = :eventId', {eventId: eventId})
            .getOne();
        const userId = (await this.eventRepository.findOne({eventId:eventId})).userId;
        const hirer: User = await this.userRepository.findOne({userId: userId});
        
        const detailContract = {
            ...contract,
            hirer: hirer,
        }
        return detailContract;
    }

    async editContract( eventId:number, editedContract:UpdateContractDto)
    {   
        const contract: Contract = await this.contractRepository.findOne({eventId: editedContract.eventId})
        if (contract.status == ContractStatus.Drafting || 
            contract.status == ContractStatus.Rejected ||
            contract.status == ContractStatus.WaitForStartDrafting )
        {
            return await this.contractRepository.update(
                1, editedContract
            );
            
        } else {
            throw new console.error("not in editable state");
        }
        
    }
}