import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWTStrategy } from './jwt.strategy';
import config from 'src/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {expiresIn: '3600s'},
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JWTStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
