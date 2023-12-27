import { Injectable } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class ItemService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createItemDto: CreateItemDto) {
    console.log(createItemDto);
    let { type_id } = createItemDto;
    let checkType = await this.prisma.type_item.findFirst({
      where: { id: type_id },
    });
    if (!checkType) {
      return errorCode({ data: "type id không tồn tại" });
    } else {
      let data = await this.prisma.items.create({ data: createItemDto });
      return successCode({ data, message: "create item thành công" });
    }
  }
  async findAll() {
    let data = await this.prisma.items.findMany();
    // console.log(data);
    return successCode({ data, message: "get all item thành công" });
  }

  async findType(id: number) {
    console.log("fe",id);
    let data = await this.prisma.items.findMany({ where: { type_id: id } });
    console.log("Ssss",data);
    return successCode({ data, message: "get all item thành công" });
  }
  async findOne(id: number) {
    // console.log(id);
    let data = await this.prisma.items.findFirst({ where: { id } });
    // console.log(data);
    return successCode({ data, message: "get item by id thành công" });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    console.log(updateItemDto);
    let { type_id } = updateItemDto;
    let checkType = await this.prisma.type_item.findFirst({
      where: { id: type_id },
    });
    // console.log(checkType);
    if (!checkType) {
      return errorCode({ data: "type id không tồn tại" });
    } else {
      let data = await this.prisma.items.update({
        data: updateItemDto,
        where: { id },
      });
      // console.log(data);
      return successCode({ data, message: "update item by id thành công" });
    }
  }

  async remove(id: number) {
    console.log(id);
    let checkData = await this.prisma.items.findFirst({ where: { id } });
    if (!checkData) {
      return errorCode({ data: "type id không tồn tại" });
    } else {
      await this.prisma.items.delete({ where: { id } });
      return successCode({ message: "xóa item by id thành công" });
    }
  }
}
