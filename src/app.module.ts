import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql",
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User],
      synchronize: true
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
