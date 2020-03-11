import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application, Status } from "src/entity/application.entity";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";
import { EventsService } from "src/events/events.service";
import { ContractService } from "src/contract/contract.service";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly eventsService: EventsService,
    private readonly contractservice: ContractService,
  ) {}

  findAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  findApplicationById(eventId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { eventId, status: Status.isApplied }
    });
  }

  async applyEvent(application: applyDto) {
    // TODO change state
    return this.applicationRepository.insert(application);
  }

  async acceptUser(acceptDto: acceptMusicianDto) {
    const eventId = acceptDto.eventId;
    this.eventsService.AcceptMusicianToEvent(eventId);
    
    return this.applicationRepository.update(acceptDto, {
      status: Status.areAccepted
    });
  }
}
