import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, createQueryBuilder } from "typeorm";
import { Contract, ContractStatus } from "src/entity/contract.entity";
import { User } from "src/entity/user.entity";
import { Event, EventStatus } from 'src/entity/events.entity'
import { EditContractDto } from "./dto/edit-contract-dto";
import { Application, ApplicationStatus } from "src/entity/application.entity";
import { NotificationService } from "src/notification/notification.service";
import { NotificationType } from "src/entity/notification.entity";



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
        private readonly notificationService: NotificationService,

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
        const hiree: User = await this.userRepository.findOne({ userId: contract.hireeId });
        
        const detailContract = {
            ...contract,
            hirer: hirer,
            hiree: hiree
        }
        return detailContract;
    }

    
    async editContract(eventId: number, editedContract: EditContractDto): Promise<any>
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
        const event: Event = await this.eventRepository.findOne({ eventId: eventId });
        if (userId == contract.hireeId && contract.status == ContractStatus.Drafting) {
            const res = await this.contractRepository.update(
                eventId, {
                status: ContractStatus.Sent,
            });
            
            await this.notificationService.createNotification({
                type: NotificationType.ContractSent,
                senderId: userId,
                receiverId: event.userId,
                eventId: eventId
            });
            return res;
            
        } else {
            throw "not authorize or Contract is waiting for consideration"
        }
    }

    async rejectContractById(eventId: number, userId: number): Promise<any> {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        const event: Event = await this.eventRepository.findOne({ eventId: eventId });

        if (userId == event.userId) {
            if (contract.status == ContractStatus.Sent) {
                const res = await this.contractRepository.update(
                    eventId, { status: ContractStatus.Rejected, }
                );
                await this.notificationService.createNotification({
                    type: NotificationType.ContractRejected,
                    senderId: userId,
                    receiverId: contract.hireeId,
                    eventId: eventId
                })


                return res;
            } else {
                throw "not in correct state current => " + contract.status;
            }
            
        } else {
            throw "not authorize"
        }
    }

    async acceptContractById(eventId: number, userId: number): Promise<any> {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        const event: Event = await this.eventRepository.findOne({ eventId: eventId });

        if (userId == event.userId) {
            if (contract.status == ContractStatus.Sent) {

                let res1 = this.contractRepository.update(
                    eventId, { status: ContractStatus.Accepted, }
                )
                let res2 = this.eventRepository.update(
                    eventId, { status: EventStatus.PaymentPending, }
                )

                await this.notificationService.createNotification({
                        type: NotificationType.ContractAccepted,
                        senderId: userId,
                        receiverId: contract.hireeId,
                        eventId: eventId
                    })

                return await [res1, res2]

            } else {
                throw "not in correct state current => " + contract.status;
            }

        } else {
            throw "not authorize"
        }
    }
    
    async cancelContractById(eventId: number, userId: number): Promise<any> {
        const contract: Contract = await this.contractRepository.findOne({ eventId: eventId });
        const event: Event = await this.eventRepository.findOne({ eventId: eventId });

        if (userId == event.userId || userId == contract.hireeId) {
            if (contract.status == ContractStatus.Drafting ||
                contract.status == ContractStatus.Sent ||
                contract.status == ContractStatus.Rejected) {
                
                const res1 = this.applicationRepository
                    .createQueryBuilder()
                    .update(Application)
                    .set({status: ApplicationStatus.isApplied})
                    .where({eventId:eventId, status: ApplicationStatus.isAccepted})
                    .execute();

                const res4 = this.applicationRepository
                    .createQueryBuilder()
                    .update(Application)
                    .set({ status: ApplicationStatus.isApplied })
                    .where({ eventId: eventId, status: ApplicationStatus.applicationRejected })
                    .execute();
                    
                const res2 = this.contractRepository.update(
                    eventId, { status: ContractStatus.Cancelled,}
                )

                const res3 = this.eventRepository.update(
                    eventId, { status: EventStatus.HaveApplicant,}
                )

                if (userId == contract.hireeId){
                    await this.notificationService.createNotification({
                        type: NotificationType.ContractCancelledByMusician,
                        senderId: userId,
                        receiverId: event.userId,
                        eventId: eventId
                    })
                } else {
                    await this.notificationService.createNotification({
                        type: NotificationType.ContractCancelledByHirer,
                        senderId: userId,
                        receiverId: contract.hireeId,
                        eventId: eventId
                    })
                }

                return await [res1, res2, res3, res4];
                
            } else {
                throw "not in correct state current => " + contract.status;
            }

        } else {
            throw "not authorize"
        }
    }
    
}
