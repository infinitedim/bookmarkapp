import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth";
import { UserModule } from "@/user";
import { BookmarkModule } from "@/bookmark";
import { PrismaModule } from "@/prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.development" }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
