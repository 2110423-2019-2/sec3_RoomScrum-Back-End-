import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import config from 'src/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        UserModule,
        AuthModule,
        TypeOrmModule.forRoot({
          type: "mysql",
          host: config.MYSQL_HOST,
          port: config.MYSQL_PORT,
          username: config.MYSQL_USER,
          password: config.MYSQL_PASSWORD,
          database: config.MYSQL_TEST_DATABASE,
          entities: [User],
          synchronize: true
        }),
      ],
      providers: [AppService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
