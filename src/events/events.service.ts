import { Injectable, Inject, Param, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Not, Repository, createQueryBuilder } from "typeorm";
import { Event, EventStatus } from "src/entity/events.entity";
import createEventDto from "./dto/create-event-dto";
import {Application, ApplicationStatus} from 'src/entity/application.entity';
import { Contract, ContractStatus } from "src/entity/contract.entity";
import { User } from "src/entity/user.entity"

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

  findAllEvent(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findAvailableEvent(): Promise<Event[]> {
    return this.eventRepository.find({status: Not(EventStatus.Cancelled)})
  }

  findEventByEventId(eventId: number): Promise<Event[]> {
    return this.eventRepository.find({eventId});
  }

  async findEventByHirerId(userId: number): Promise<Event[]> {
    const events = await this.eventRepository.find({ userId, status: Not(EventStatus.Cancelled) });
    // Hack should query builder or maps
    for (const event of events ){
      event.contract.hiree = await createQueryBuilder()
        .select('hiree')
        .from(User, 'hiree').getOne() ;
    }
    return events;
  }

  advanceSearch(searchType: string, value: string): Promise<Event[]> {
    if (searchType == "description") {
      return this.eventRepository.find({
        where: [{ description: Like(`%${value}%`) }]
      });
    } else if (searchType == "name") {
      return this.eventRepository.find({
        where: [{ eventName: Like(`%${value}%`) }]
      });
    } else if (searchType == "location") {
      return this.eventRepository.find({
        where: [
          { address: Like(`%${value}%`) },
          { subdistrict: Like(`%${value}%`) },
          { district: Like(`%${value}%`) },
          { province: Like(`%${value}%`) },
          { country: Like(`%${value}%`) },
          { zipcode: Like(`%${value}%`) }
        ]
      });
    } else {
      return this.eventRepository.find({
        where: [
          { eventName: Like(`%${value}%`) },
          { description: Like(`%${value}%`) },
          { address: Like(`%${value}%`) },
          { subdistrict: Like(`%${value}%`) },
          { district: Like(`%${value}%`) },
          { province: Like(`%${value}%`) },
          { country: Like(`%${value}%`) },
          { zipcode: Like(`%${value}%`) }
        ]
      });
    }
  }
  
  // THIS IS A HACK TODO role permission
  async create(event: createEventDto) {
    const createEventRes = await this.eventRepository.insert(event);
    const eventId = createEventRes.generatedMaps[0].eventId; 
    const createContractRes = this.contractRepository.insert({
        eventId: eventId,
        description: 'CONTRACT NOT ACTIVE',
        price: 9999999
      });
    const contract: Contract = <Contract> (await createContractRes).generatedMaps[0]; 
    const updateContract = this.eventRepository.update(eventId, {contract: contract});
    return eventId;
  }

  cancelEvent(eventId: number) {
    return this.eventRepository.update({eventId}, {status: EventStatus.Cancelled});
  }

  async getEventPicName(id: number) {
    return (await this.eventRepository.findOneOrFail({ eventId: id }))
      .eventImage;
  }

  async uploadEventPic(@UploadedFile() file, eventId: number): Promise<any> {
    const imagePath = file.filename;
    this.eventRepository.update(eventId, {eventImage: imagePath});
    return;
  }

  async updateEvent(eventId: number, event: createEventDto) { //Edit Event only when no one apply
    return this.eventRepository.update({eventId }, event);
  }

  async updateEventStatus(eventId: number, status: EventStatus){
    return this.eventRepository.update({eventId}, {status: status});
  }

  async receivePayment(eventId:number)
  {
    return this.eventRepository.update({eventId}, {status: EventStatus.Complete});
  }
}
