import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, createQueryBuilder, Brackets, Not } from "typeorm";
import { Application, ApplicationStatus } from "src/entity/application.entity";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";
import inviteMusicianDto from "./dto/invite-musician-dto";
import findMyApplicationDto from "./dto/find-my-application-dto";
import { User } from "src/entity/user.entity";
import { Event, EventStatus } from 'src/entity/events.entity';
import { Contract, ContractStatus } from "src/entity/contract.entity";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  findAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  findApplicationById(eventId: number, hireeId: number): Promise<Application> {
    return this.applicationRepository.findOne( {eventId, hireeId} );
  }

  findApplicationByEventId(eventId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { eventId, status: ApplicationStatus.isApplied }
    });
  }

  async findMyApplication(hireeId: number, params: findMyApplicationDto): Promise<Application[]> {
    
    if (!params.status.length) {
      params.status = ["isInvited", "isApplied", "applicationRejected", "isAccepted"]
    }

    const applications = await this.applicationRepository
      .createQueryBuilder('application')
      .where("application.status IN (:...status)", {status: params.status})
      .andWhere("hireeId = :id", {id: hireeId})
      .leftJoinAndSelect("application.event", "event")
      .getMany() 
    
    if (!applications.length) return applications;

    // join on user id
    const hirerIds = applications.map(app => app.event.userId);

    const users = await createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where('user.userId IN (:...userIds)', {userIds: hirerIds})
      .getMany();

    const usersMap = new Map<Number, User>();
    users.forEach(user => {
      usersMap.set(user.userId, user);
    });
    
    for (const app of applications) {
      app.event.user = usersMap.get(app.event.userId);
      if (app.status == ApplicationStatus.isAccepted) {
        app.event.contract = await this.contractRepository.findOne({eventId: app.eventId});
      }
    }
    
    return applications;
  }
  // THIS IS A HACK
  async applyEvent(application: applyDto) {
    const res1 = this.applicationRepository.insert(application);
    const res2 =  this.eventRepository.update(application.eventId, {status: EventStatus.HaveApplicant});
    return await [res1, res2];
  }

  async acceptUser(user: acceptMusicianDto) {
    const res1 = this.applicationRepository.update(user, {
      status: ApplicationStatus.isAccepted
    });
    const res2 = this.applicationRepository.update({eventId: user.eventId, status: Not(ApplicationStatus.isAccepted)},{
      status: ApplicationStatus.applicationRejected
    });
    const res3 = this.eventRepository.update(user.eventId, { status: EventStatus.ContractDrafting});
    const res4 = this.contractRepository.update(user.eventId, { 
      status: ContractStatus.WaitForStartDrafting, 
      hireeId: user.hireeId,
      description: 'MUSICIAN, DRAFT YOUR CONTRACT HERE'});
    
    return await [res1, res2, res3, res4];
  }


  async inviteMusicianById(application: inviteMusicianDto){
    const checkResult = await this.applicationRepository.findOne({eventId: application.eventId, hireeId: application.hireeId});
    if (!checkResult){
      return this.applicationRepository.insert(application);
    } 
    else {
      throw "User already applied";
    }
  }
  
  async acceptInvitation(hireeId: number, eventId: number) {
    return this.applicationRepository.update({hireeId, eventId, status: ApplicationStatus.isInvited}, {
      status: ApplicationStatus.isApplied,
      timestamp: new Date(),
    });
  }

  async cancelMyApplication(hireeId:number, eventId: number){
    return this.applicationRepository.delete({hireeId, eventId})
  }
}
