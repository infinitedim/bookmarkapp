import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { PayloadInterface } from "@/interfaces";
import { PrismaService } from "@/prisma";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_TOKEN,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (user as any).hash;

    return user;
  }
}
