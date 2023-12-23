import { Injectable } from "@nestjs/common";
import { CreateBookItemDto } from "./dto/create-book_item.dto";
import { UpdateBookItemDto } from "./dto/update-book_item.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class BookItemService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createBookItemDto: CreateBookItemDto) {
    console.log(createBookItemDto);
    let { item_id, user_id } = createBookItemDto;
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
        let data = await this.prisma.book_item.create({
          data: createBookItemDto,
        });
        // console.log(data);
        return successCode({
          data,
          message: "đặt hàng thành công ",
        });
      }
    }
  }

  async findAll() {
    // console.log("da");
    let data = await this.prisma.book_item.findMany();
    return successCode({
      data,
      message: "get all item booked",
    });
  }

  async findUser(id: number) {
    let data = await this.prisma.book_item.findMany({
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

  async update(id: number, updateBookItemDto: UpdateBookItemDto) {
    console.log("id", id);
    let { user_id } = updateBookItemDto;
    let checkAdmin = await this.prisma.users.findFirst({
      where: { id: user_id },
    });
    // console.log(checkAdmin);
    let { role } = checkAdmin;
    if (role == "ADMIN") {
      // console.log("first");
      let data = await this.prisma.book_item.update({
        where: { id },
        data: updateBookItemDto,
      });
      // console.log(data);
      return successCode({ data, message: "update đơn hàng by id thành công" });
    } else {
      return errorCode({ data: "bạn không có quyền" });
    }
  }

  async remove(id: number, idUser: number) {
    let checkAdmin = await this.prisma.users.findFirst({
      where: { id: idUser },
    });
    // console.log(checkAdmin);
    let { role } = checkAdmin;
    if (role == "ADMIN") {
      let datareq = await this.prisma.req_user_booked.delete({
        where: { book_id: id },
      });
      let data = await this.prisma.book_item.delete({
        where: { id },
      });
      console.log(data);
      return successCode({
        data: "xóa thành công",
        message: "delete đơn hàng by id thành công",
      });
    } else {
      return errorCode({ data: "bạn không có quyền" });
    }
  }
}
