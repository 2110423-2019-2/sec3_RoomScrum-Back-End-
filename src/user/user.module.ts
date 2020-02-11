import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MulterModule.register({
    dest: './uploaded-files',
  })],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
