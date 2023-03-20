import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "@/classes";

@Controller("auth")
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  async signup(@Body() dto: AuthDTO) {
    return await this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post("signin")
  async signin(@Body() dto: AuthDTO) {
    return await this.authService.signin(dto);
  }
}
