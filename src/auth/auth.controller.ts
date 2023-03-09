import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "@/classes";

@Controller("auth")
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) {}

  @Post("signin")
  signup(@Body() dto: AuthDTO) {
    return this.authService.signup(dto);
  }

  @Post("signup")
  signin() {
    return this.authService.signin();
  }
}
