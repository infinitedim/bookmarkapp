/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as argon from "argon2";
import type { AuthDTO } from "@/classes";
import { PrismaService } from "@/prisma";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) { }

  async signup(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return await this.signToken(user.id, user.email);
    } catch (error) {
      throw new BadRequestException("Email has been registered");
    }
  }

  async signin(dto: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) throw new NotFoundException("Account not found");

    const passwordMatcher = await argon.verify(user.hash, dto.password);

    if (!passwordMatcher) throw new BadRequestException("Password Incorrect");

    return await this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "3d",
      secret: process.env.SECRET_TOKEN,
    });

    return {
      access_token: token,
    };
  }
}
