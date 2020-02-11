import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';
import { Event } from './events.entity';
import { EventsService } from './events.service';

describe('Events Controller', () => {
  let controller: EventsController;
  let module: TestingModule;
  let eventsService: EventsService

  beforeAll(async () => {
    
    module = await Test.createTestingModule({
      controllers: [EventsController],
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: config.MYSQL_HOST,
          port: config.MYSQL_PORT,
          username: config.MYSQL_USER,
          password: config.MYSQL_PASSWORD,
          database: config.MYSQL_TEST_DATABASE,
          entities: [Event],
          synchronize: true,
          dropSchema: true, // for debug only !!
        }),
        TypeOrmModule.forFeature([Event])
      ],
      providers: [EventsService],
    }).compile();
    controller = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);    
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
