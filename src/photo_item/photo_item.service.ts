import { Injectable } from "@nestjs/common";
import { CreatePhotoItemDto } from "./dto/create-photo_item.dto";
import { UpdatePhotoItemDto } from "./dto/update-photo_item.dto";

@Injectable()
export class PhotoItemService {
  uploadPhoto(token: string, files: any) {
    console.log(files);
    return "This action adds a new photoItem";
  }
  findAll() {
    return `This action returns all photoItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photoItem`;
  }

  update(id: number, updatePhotoItemDto: UpdatePhotoItemDto) {
    return `This action updates a #${id} photoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} photoItem`;
  }
}
