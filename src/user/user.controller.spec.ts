import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";

import config from "src/config";
import {
  User,
  Gender,
  UserType,
  MusicianApprovement
} from "src/entity/user.entity";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import createUserDto from "./dto/create-user-dto";

const baseUser: createUserDto = {
  firstName: "aaaa",
  lastName: "aaaa",
  password: "passw0rd",
  username: "username",
  email: "doge@gmail.com",
  phoneNumber: "082-111-1234",
  nationalId: "1234567890123",
  birthdate: "01-01-1999",
  address: "foo",
  subdistrict: "aaaaa",
  district: "bbbb",
  cityState: "Bangkok",
  zipcode: "10000",
  country: "Thailand",
  videoUrl: "www.youtube.com",
  gender: Gender.Male,
  userType: UserType.Musician,
  musicianApprovement: MusicianApprovement.NotApproved,
  bio: "bio"
};

describe("User Controller", () => {
  let module: TestingModule;
  let controller: UserController;
  let userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
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
          synchronize: true,
          dropSchema: true // for debug only !!
        }),
        TypeOrmModule.forFeature([User])
      ],
      providers: [UserService]
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe("Test create user endpoint", () => {
    it("should create user sucessfully", () => {
      return expect(
        controller.createUser({
          ...baseUser
        })
      ).resolves.toMatchObject({
        status: 200
      });
    });

    it("should create another user sucessfully", () => {
      return expect(
        controller.createUser({
          ...baseUser,
          username: "username2"
        })
      ).resolves.toMatchObject({
        status: 200
      });
    });

    it("should not allow duplicate username", () => {
      expect.assertions(1);
      return controller
        .createUser({
          ...baseUser
        })
        .catch(err => {
          expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/username/)
          });
        });
    });

    // it("should not allow duplicate email", () => {
    //   fail("Not implemented")
    // })

    // it("should not allow incomplete information", () => {
    //   fail("Not implemented")
    // })

    // it("should not allow musician with incomplete information", () => {
    //   fail("Not implemented")
    // })
  });

  // describe('Test another endpoint', () => {
  //   it("....", () => {
  //     fail("Not implemented");
  //   })
  // })

  // describe('Test another endpoint', () => {
  //   it("....", () => {
  //     fail("Not implemented");
  //   })
  // })

  // describe('Test another endpoint', () => {
  //   it("....", () => {
  //     fail("Not implemented");
  //   })
  // })
});
