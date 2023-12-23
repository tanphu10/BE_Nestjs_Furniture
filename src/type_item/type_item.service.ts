import { Injectable } from "@nestjs/common";
import { CreateTypeItemDto } from "./dto/create-type_item.dto";
import { UpdateTypeItemDto } from "./dto/update-type_item.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class TypeItemService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createTypeItemDto: CreateTypeItemDto) {
    console.log(createTypeItemDto);
    let data = await this.prisma.type_item.create({ data: createTypeItemDto });
    return successCode({ data, message: "create type_item thành công" });
  }

  async findAll() {
    let data = await this.prisma.type_item.findMany();
    return successCode({ data, message: "get all type_item thành công" });
  }

  async findOne(id: number) {
    let data = await this.prisma.type_item.findFirst({ where: { id } });
    if (data) {
      return successCode({ data, message: "get type_item by id thành công" });
    } else {
      return errorCode({ data: "type item không tồn tại" });
    }
  }

  async update(id: number, updateTypeItemDto: UpdateTypeItemDto) {
    console.log(updateTypeItemDto);
    let item = await this.prisma.type_item.findFirst({ where: { id } });
    console.log(item);
    if (!item) {
      return errorCode({ data: "type item không tồn tại" });
    } else {
      let newData = await this.prisma.type_item.update({
        data: updateTypeItemDto,
        where: { id },
      });
      // console.log(newData);
      return successCode({
        data: newData,
        message: "update type_item by id thành công",
      });
    }
  }
  async remove(id: number) {
    console.log(id);
    let checkData = await this.prisma.type_item.findFirst({ where: { id } });
    if (checkData) {
      await this.prisma.type_item.delete({ where: { id } });
      return successCode({
        data: id,
        message: "đã xóa thành công type_id",
      });
    } else {
      return errorCode({ data: "type item không tồn tại" });
    }
  }
}
