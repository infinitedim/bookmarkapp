import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "@/classes";
import type { User } from "@prisma/client";

@Controller("auth")
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: AuthDTO): Promise<User> {
    return await this.authService.signup(dto);
  }

  @Post("signin")
  async signin(@Body() dto: AuthDTO): Promise<User> {
    return await this.authService.signin(dto);
  }
}
