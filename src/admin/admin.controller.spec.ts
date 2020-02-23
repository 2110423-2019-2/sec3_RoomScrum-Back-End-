import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "src/config";
import { User } from "src/entity/user.entity";

describe("Admin Controller", () => {
  let module: TestingModule;
  let controller: AdminController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AdminService],
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: config.MYSQL_HOST,
          port: config.MYSQL_PORT,
          username: config.MYSQL_USER,
          password: config.MYSQL_PASSWORD,
          database: config.MYSQL_TEST_DATABASE,
          entities: [User],
          synchronize: true,
          dropSchema: true // for debug only !!
        }),
        TypeOrmModule.forFeature([User])
      ],
      controllers: [AdminController]
    }).compile();
    controller = module.get<AdminController>(AdminController);
    console.log(controller);
  });

  afterAll(async () => {
    await module.close();
  });

  describe("Test", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });
  });
});
