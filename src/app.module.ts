import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth";
import { UserModule } from "@/user/user.module";
import { BookmarkModule } from "@/bookmark/bookmark.module";

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
