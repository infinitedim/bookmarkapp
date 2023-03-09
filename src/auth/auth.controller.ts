import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "@/classes";

@Controller("auth")
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) {}

  @Post("signin")
  signin(@Body() dto: AuthDTO) {
    console.log({ dto });

    return this.authService.signin();
  }

  @Post("signup")
  signup() {
    return this.authService.signup();
  }
}
