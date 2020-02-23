import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hiree } from "src/entity/hiree.entity";
import { HireeService } from "./hiree.service";
import { HireeController } from "./hiree.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Hiree])],
  providers: [HireeService],
  controllers: [HireeController],
  exports: [HireeService]
})
export class HireeModule {}
