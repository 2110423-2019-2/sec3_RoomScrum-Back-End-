import { Test, TestingModule } from "@nestjs/testing";
import { ApplicationController } from "./application.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "../entity/application.entity";
import { Event } from "src/entity/events.entity";
import config from "src/config";
import { ApplicationService } from "./application.service";

describe("Application Controller", () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationService],
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: config.MYSQL_HOST,
          port: config.MYSQL_PORT,
          username: config.MYSQL_USER,
          password: config.MYSQL_PASSWORD,
          database: config.MYSQL_TEST_DATABASE,
          entities: [Event, Application],
          synchronize: true,
          dropSchema: true // for debug only !!
        }),
        TypeOrmModule.forFeature([Application])
      ],
      controllers: [ApplicationController]
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  describe("Event controller", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });
});
