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

    // HACK should use more query builder or eager join
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

    
    async editContract(eventId: number, editedContract: UpdateContractDto): Promise<any>
    {   
        const contract: Contract = await this.contractRepository.findOne({eventId: eventId})
        if (contract.status == ContractStatus.Drafting || 
            contract.status == ContractStatus.Rejected ||
            contract.status == ContractStatus.WaitForStartDrafting ) {
            return await this.contractRepository.update(
                eventId,{
                    ...editedContract,
                    status: ContractStatus.Drafting
                }
            );
            
        } else {
            throw "not in editable state";
        }
    }

    
    async sendContractById( eventId:number, userId:number ): Promise<any>
    {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        if (userId == contract.hireeId && contract.status == ContractStatus.Drafting) {
            return await this.contractRepository.update(
                eventId, {
                    status: ContractStatus.Sent,
                }
            )
        } else {
            throw "not authorize or Contract is waiting for consideration"
        }
    }

    async rejectContractById(eventId: number, userId: number): Promise<any> {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        if (userId == contract.hireeId) {
            if (contract.status == ContractStatus.Sent) {
                    
                return await this.contractRepository.update(
                    eventId,{status: ContractStatus.Rejected,}
                )
            } else {
                throw "not in correct state current =>" + contract.status;
            }
            
        } else {
            throw "not authorize"
        }
    }

    async acceptContractById(eventId: number, userId: number): Promise<any> {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        if (userId == contract.hireeId) {
            if (contract.status == ContractStatus.Sent) {

                return await this.contractRepository.update(
                    eventId, { status: ContractStatus.Accepted, }
                )
            } else {
                throw "not in correct state current =>" + contract.status;
            }

        } else {
            throw "not authorize"
        }
    }
    
}