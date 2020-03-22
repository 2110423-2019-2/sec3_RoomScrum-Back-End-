import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, createQueryBuilder, Brackets } from "typeorm";
import { Application, Status } from "src/entity/application.entity";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";
import findMyApplicationDto from "./dto/find-my-application-dto";
import { Event } from "src/entity/events.entity";
import { User } from "src/entity/user.entity";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>
  ) {}

  findAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  findApplicationById(eventId: number, hireeId: number): Promise<Application> {
    return this.applicationRepository.findOne( {eventId, hireeId} );
  }

  findApplicationByEventId(eventId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { eventId, status: Status.isApplied }
    });
  }

  async findMyApplication(hireeId: number, params: findMyApplicationDto): Promise<Application[]> {
    
    const applications = await this.applicationRepository
      .createQueryBuilder('application')
      .where(new Brackets(qb => {
          params.status.forEach((status,idx) => qb.orWhere("application.status = :st"+idx, {["st"+idx]: status}))
        }))
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

    applications.forEach(app => {
      app.event.user = usersMap.get(app.event.userId);
    })
    
    return applications;
  }

  async applyEvent(application: applyDto) {
    return this.applicationRepository.insert(application);
  }

  async acceptUser(user: acceptMusicianDto) {
    return this.applicationRepository.update(user, {
      status: Status.isAccepted
    });
  }
}
