import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}
  signup() {
    return { messege: "I have Signed up" };
  }

  signin() {
    return { messege: "I have Signed in" };
  }
}
