import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-jwt';
import { Request } from 'express';

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
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}