import { Injectable } from "@nestjs/common";
import { CreateAddCartDto } from "./dto/create-add_cart.dto";
import { UpdateAddCartDto } from "./dto/update-add_cart.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class AddCartService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createAddCartDto: CreateAddCartDto) {
    // console.log(createAddCartDto);
    let { item_id, user_id } = createAddCartDto;
    let checkItem = await this.prisma.items.findFirst({
      where: { id: item_id },
    });
    let checkUser = await this.prisma.users.findFirst({
      where: { id: user_id },
    });
    if (!checkItem) {
      return errorCode({ data: "item không tồn tại" });
    } else {
      if (!checkUser) {
        return errorCode({ data: "user không tồn tại" });
      } else {
        let data = await this.prisma.addCart.create({ data: createAddCartDto });
        console.log(data);
        return successCode({
          data,
          message: "thêm item thành công vào giỏ hàng",
        });
      }
    }
  }

  async findAll() {
    let data = await this.prisma.addCart.findMany();
    return successCode({
      data,
      message: "get all giỏ hàng thành công",
    });
  }

  async findUser(id: number) {
    let data = await this.prisma.addCart.findMany({
      where: {
        user_id: id,
      },
      include: { items: true, users: true },
    });
    return successCode({
      data,
      message: "get item by user_id thành công",
    });
  }

  async update(id: number, updateAddCartDto: UpdateAddCartDto) {
    // console.log(id);
    // console.log(updateAddCartDto);
    let data = await this.prisma.addCart.update({
      where: { id },
      data: updateAddCartDto,
    });
    return successCode({
      data,
      message: "update item thành công",
    });
  }

  async remove(id: number) {
    await this.prisma.addCart.delete({
      where: { id },
    });
    return successCode({
      message: "xóa item thành công",
    });
  }
}
