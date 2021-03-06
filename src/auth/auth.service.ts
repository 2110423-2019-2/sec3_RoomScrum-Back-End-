import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserPass(username: string, password: string): Promise<any> {
    const foundUser = (await this.userService.find({ username }))[0];
    if (!foundUser) {
      return null;
    }
    const match = await compare(password, foundUser.password);
    if (!match) {
      return null;
    }
    return {
      username,
      userId: foundUser.userId,
      userType: foundUser.userType,
    };
  }

  sign(user: any) {
    return this.jwtService.sign(user);
  }
}
