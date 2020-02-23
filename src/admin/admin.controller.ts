import {
  Controller,
  Post,
  Body,
  Get,
  NotImplementedException
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { ApproveUserDto } from "./dto/approve-user.dto";
import { User } from "src/entity/user.entity";
import { RejectUserDto } from "./dto/reject-user.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("/user/approve")
  async approveUser(@Body() approveUserDto: ApproveUserDto) {
    const updateResult = await this.adminService.approveUser(approveUserDto);
    return {
      status: updateResult.raw.changedRows ? 200 : 304,
      message: "OK"
    };
  }

  @Post("/user/reject")
  async rejectUser(@Body() rejectUserDto: RejectUserDto) {
    const updateResult = await this.adminService.rejectUser(rejectUserDto);
    return {
      status: updateResult.raw.changedRows ? 200 : 304,
      message: "OK"
    };
  }

  @Get("/user/unapproved")
  async getUnapprovedUsers(): Promise<User[]> {
    return this.adminService.getUnapprovedUsers();
  }
}
