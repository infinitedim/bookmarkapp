import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as argon from "argon2";
import type { User } from "@prisma/client";
import type { AuthDTO } from "@/classes";
import { PrismaService } from "@/prisma";

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier, no-useless-constructor
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDTO): Promise<User> {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // delete user.hash;

      return user;
    } catch (error) {
      throw new ForbiddenException("Email has been registered");
    }
  }

  async signin(dto: AuthDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user == null) throw new NotFoundException("Account not found");

    const passwordMatcher = await argon.verify(user.hash, dto.password);

    if (!passwordMatcher) throw new ForbiddenException("Password Incorrect");

    // delete user.hash;

    return user;
  }
}
