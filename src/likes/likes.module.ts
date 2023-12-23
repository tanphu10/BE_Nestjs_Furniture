import { Module } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { LikesController } from "./likes.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
