import { Injectable } from "@nestjs/common";
import { CreatePhotoItemDto } from "./dto/create-photo_item.dto";
import { UpdatePhotoItemDto } from "./dto/update-photo_item.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class PhotoItemService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  uploadPhoto(token: string, files: any) {
    console.log(files);
    return "This action adds a new photoItem";
  }
  findAll() {
    return `This action returns all photoItem`;
  }

  async findOne(id: number) {
    let checkData = await this.prisma.items.findMany({
      where: { id },
    });
    if (checkData.length > 0) {
      let data = await this.prisma.photoItems.findMany({
        where: { item_id: id },
      });
      console.log(data);
      return successCode({
        data,
        message: "get photo by item_id thành công",
      });
    } else {
      return errorCode({ message: "item không tồn tại" });
    }
  }

  update(id: number, updatePhotoItemDto: UpdatePhotoItemDto) {
    return `This action updates a #${id} photoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} photoItem`;
  }
}
