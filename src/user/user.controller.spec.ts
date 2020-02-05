import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";

import config from 'src/config';
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as _ from 'lodash';

describe("User Controller", () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
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
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it("should be an array", done => {
    expect.assertions(1);
    controller.findAllUsers().then(res => {
      expect(_.isArray(res)).toBeTruthy();
      done();
    })
    .catch(err => {
      done(err);
    })
  });
});
