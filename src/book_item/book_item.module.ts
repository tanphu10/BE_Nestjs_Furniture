import { Module } from "@nestjs/common";
import { BookItemService } from "./book_item.service";
import { BookItemController } from "./book_item.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [BookItemController],
  providers: [BookItemService],
})
export class BookItemModule {}
