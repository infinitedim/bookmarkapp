import { GetUser } from "@/auth/decorator";
import { JWTGuard } from "@/auth/guard";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

@UseGuards(JWTGuard)
@Controller("users")
export class UserController {
  @Get("me")
  GetMe(@GetUser() user: User) {
    return user;
  }
}
