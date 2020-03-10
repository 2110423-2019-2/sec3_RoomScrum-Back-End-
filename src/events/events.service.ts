import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Event } from "src/entity/events.entity";
import createEventDto from "./dto/create-event-dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  findAllEvent(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findEventById(eventId: number): Promise<Event[]> {
    return this.eventRepository.find({"eventId": eventId});
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

  async create(event: createEventDto) {
    return this.eventRepository.insert(event);
  }

  cancelEvent(eventId: number) {
    return this.eventRepository.update({"eventId": eventId}, {"isCancelled": true});
  }

  async getEventPicName(id: number) {
    return (await this.eventRepository.findOneOrFail({ eventId: id }))
      .eventImage;
  }

  async updateEvent(eventId: number, event: createEventDto) { //Edit Event
    return this.eventRepository.update({ "eventId": eventId }, event);
  }
}
