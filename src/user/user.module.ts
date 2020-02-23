import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { HireeModule } from "src/hiree/hiree.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), HireeModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
