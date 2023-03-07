import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
  signup() {
    return { messege: "I have Signed up" };
  }

  signin() {
    return { messege: "I have Signed in" };
  }
}
