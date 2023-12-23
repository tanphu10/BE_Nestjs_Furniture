import { Module } from "@nestjs/common";
import { TypeItemService } from "./type_item.service";
import { TypeItemController } from "./type_item.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [TypeItemController],
  providers: [TypeItemService],
})
export class TypeItemModule {}
