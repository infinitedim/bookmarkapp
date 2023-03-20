import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./strategies";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
