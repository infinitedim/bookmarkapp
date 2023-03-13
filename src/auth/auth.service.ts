/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as argon from "argon2";
import type { User } from "@prisma/client";
import type { AuthDTO } from "@/classes";
import { PrismaService } from "@/prisma";

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
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

      delete (user as any).hash;

      return user;
    } catch (error) {
      throw new BadRequestException("Email has been registered");
    }
  }

  async signin(dto: AuthDTO): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) throw new NotFoundException("Account not found");

    const passwordMatcher = await argon.verify(user.hash, dto.password);

    if (!passwordMatcher) throw new UnauthorizedException("Password Incorrect");

    delete (user as any).hash;

    return user;
  }
}
