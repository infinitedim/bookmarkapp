import { Injectable } from "@nestjs/common";
import { AuthDTO } from "@/classes";
import { PrismaService } from "@/prisma/prisma.service";
import * as argon from "argon2";

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    delete user.hash;

    return user;
  }

  signin() {
    return { messege: "I have Signed in" };
  }
}
