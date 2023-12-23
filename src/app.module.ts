import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ItemModule } from './item/item.module';
import { TypeItemModule } from './type_item/type_item.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { AddCartModule } from './add_cart/add_cart.module';
import { BookItemModule } from './book_item/book_item.module';
import { RequestUserModule } from './request_user/request_user.module';

@Module({
  imports: [UsersModule, AuthModule, ItemModule, TypeItemModule, CommentModule, LikesModule, AddCartModule, BookItemModule, RequestUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
