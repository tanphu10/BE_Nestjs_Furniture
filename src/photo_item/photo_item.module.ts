import { Module } from "@nestjs/common";
import { PhotoItemService } from "./photo_item.service";
import { PhotoItemController } from "./photo_item.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [PhotoItemController],
  providers: [PhotoItemService],
})
export class PhotoItemModule {}
