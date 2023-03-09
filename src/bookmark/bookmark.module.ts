import { Module } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";

@Module({
  providers: [BookmarkService],
})
export class BookmarkModule {}
