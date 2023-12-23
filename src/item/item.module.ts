import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
