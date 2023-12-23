import { Module } from "@nestjs/common";
import { AddCartService } from "./add_cart.service";
import { AddCartController } from "./add_cart.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AddCartController],
  providers: [AddCartService],
})
export class AddCartModule {}
