import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from "express";
import config from "src/config";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) {
          return req.cookies.token;
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
