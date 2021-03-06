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
import { NotificationType } from "src/entity/notification.entity";
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly notificationService: NotificationService,
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

  findAcceptedHiree(eventId: number): Promise<Application> {
    return this.applicationRepository.findOne({eventId, status:ApplicationStatus.isAccepted});
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
      // if (app.status == ApplicationStatus.isAccepted) {
      app.event.contract = await this.contractRepository.findOne({eventId: app.eventId});
      app.event.contract.hiree = await createQueryBuilder()
        .select('hiree')
        .from(User, 'hiree')
        .where('hiree.userId = :id', {id: app.event.contract.hireeId})
        .getOne()
      //   // app.event.contract = await this.contractRepository
      //   //   .createQueryBuilder('contract')
      //   //   .where('contract.eventId = (:eventId)', { eventId: app.eventId })
      //   //   .andWhere('contract.hireeId = user.userId')
      //   //   .leftJoinAndSelect('contract.hiree','user')
      //   //   .getOne();
        
      // }
    }
    
    return applications;
  }
  // THIS IS A HACK TODO role permission
  async applyEvent(application: applyDto) {
    const res1 = this.applicationRepository.insert(application);
    const res2 =  this.eventRepository.update(application.eventId, {status: EventStatus.HaveApplicant});
    const event: Event = await this.eventRepository.findOne({ eventId: application.eventId });

    await this.notificationService.createNotification({
      type: NotificationType.MusicianApplied,
      senderId: application.hireeId,
      receiverId: event.userId,
      eventId: application.eventId
    })
    return await [res1, res2];
  }

  async acceptUser(user: acceptMusicianDto, userId: number) {

    const res1 = this.applicationRepository.update(user, {
      status: ApplicationStatus.isAccepted
    });
    const res2 = await this.applicationRepository.update({eventId: user.eventId, status: Not(ApplicationStatus.isAccepted)},{
      status: ApplicationStatus.applicationRejected
    });
    const rejectApplications = await this.applicationRepository.find({eventId: user.eventId, status: ApplicationStatus.applicationRejected});
    for (const app of rejectApplications){
      await this.notificationService.createNotification({
        type: NotificationType.ApplicationRejected,
        senderId: userId,
        receiverId: app.hireeId,
        eventId: user.eventId
      })
    }
    
    console.log(res2);

    const res3 = this.eventRepository.update(user.eventId, { status: EventStatus.ContractDrafting});
    const res4 = this.contractRepository.update(user.eventId, { 
      status: ContractStatus.WaitForStartDrafting, 
      hireeId: user.hireeId,
      description: 'MUSICIAN, DRAFT YOUR CONTRACT HERE'});
    return await [res1, res2, res3, res4];
  
  }


  async inviteMusicianById(application: inviteMusicianDto, userId: number){
    const checkResult = await this.applicationRepository.findOne({eventId: application.eventId, hireeId: application.hireeId});
    if (!checkResult){
      await this.notificationService.createNotification({
        type: NotificationType.InvitationReceived,
        senderId: userId,
        receiverId: application.hireeId,
        eventId: application.eventId
      })
      return this.applicationRepository.insert(application);
    } 
    else {
      throw "User already applied";
    }
  }
  
  async acceptInvitation(hireeId: number, eventId: number) {
    const res1 = this.applicationRepository.update({hireeId, eventId, status: ApplicationStatus.isInvited}, {
      status: ApplicationStatus.isApplied,
      timestamp: new Date(),
    });
    const res2 =  this.eventRepository.update(eventId, {status: EventStatus.HaveApplicant});
    const event = this.eventRepository.findOne({eventId: eventId});
    await this.notificationService.createNotification({
      type: NotificationType.MusicianApplied,
      senderId: hireeId,
      receiverId: (await event).userId,
      eventId: eventId
    })
    return await[res1, res2];
  }

  async cancelMyApplication(hireeId:number, eventId: number){
    return this.applicationRepository.delete({hireeId, eventId})
  }
}
