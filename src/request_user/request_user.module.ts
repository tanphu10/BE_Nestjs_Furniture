import { Module } from "@nestjs/common";
import { RequestUserService } from "./request_user.service";
import { RequestUserController } from "./request_user.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [RequestUserController],
  providers: [RequestUserService],
})
export class RequestUserModule {}
