import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Application, Status } from "src/entity/application.entity";
import applyDto from "./dto/apply-dto";
import acceptMusicianDto from "./dto/accept-musician-dto";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>
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
    return this.applicationRepository.insert(application);
  }

  async acceptUser(user: acceptMusicianDto) {
    return this.applicationRepository.update(user, {
      status: Status.areAccepted
    });
  }
}
