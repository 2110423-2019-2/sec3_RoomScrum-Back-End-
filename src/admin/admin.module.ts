import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";

@Module({
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminService]
})
export class AdminModule {}
