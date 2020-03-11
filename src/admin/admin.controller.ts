import { Controller, Post, Body, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { User } from "src/entity/user.entity";
import { SelectUserDto } from "./dto/select-user.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("/user/approve")
  async approveUser(@Body() userToApprove: SelectUserDto) {
    const updateResult = await this.adminService.approveUser(userToApprove);
    return {
      status: updateResult.raw.changedRows ? 200 : 304,
      message: "OK"
    };
  }

  @Post("/user/reject")
  async rejectUser(@Body() userToReject: SelectUserDto) {
    const updateResult = await this.adminService.rejectUser(userToReject);
    return {
      status: updateResult.raw.changedRows ? 200 : 304,
      message: "OK"
    };
  }

  @Get("/user/unapproved")
  async getUnapprovedUsers(): Promise<User[]> {
    return this.adminService.getUnapprovedUsers();
  }

  @Post('/user/ban')
  async banUser(@Body() userToBan: BanUserDto) {
    return this.adminService.banUser(userToBan);
  }

  @Get('user/banlist')
  async getBannedUsers(): Promise<User[]> {
    return this.adminService.getBannedUsers()
  }

}
