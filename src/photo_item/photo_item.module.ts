import { Module } from '@nestjs/common';
import { PhotoItemService } from './photo_item.service';
import { PhotoItemController } from './photo_item.controller';

@Module({
  controllers: [PhotoItemController],
  providers: [PhotoItemService],
})
export class PhotoItemModule {}
