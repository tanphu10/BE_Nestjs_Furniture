import { Injectable } from "@nestjs/common";
import { CreateRequestUserDto } from "./dto/create-request_user.dto";
import { UpdateRequestUserDto } from "./dto/update-request_user.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class RequestUserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createRequestUserDto: CreateRequestUserDto) {
    // console.log(createRequestUserDto);
    let { book_id } = createRequestUserDto;
    let checkData = await this.prisma.req_user_booked.findMany({
      where: { book_id },
    });
    // console.log(checkData);
    if (checkData.length > 0) {
      return successCode({ data: "đơn hàng đang đợi admin duyệt" });
    } else {
      let data = await this.prisma.req_user_booked.create({
        data: createRequestUserDto,
      });
      return successCode({
        data,
        message: "đã gửi yêu cầu đơn hàng và đợi admin duyệt",
      });
    }
  }
  async findAll() {
    let data = await this.prisma.req_user_booked.findMany({
      include: { book_item: true },
    });
    return successCode({
      data,
      message: "get all item res-booked",
    });
  }

  async findOne(iUser: number) {
    // console.log(iUser);
    let data = await this.prisma.req_user_booked.findMany({
      where: { book_item: { user_id: iUser } },
      include: { book_item: true },
    });
    return successCode({
      data,
      message: "get req by user res-booked",
    });
  }

  async update(updateRequestUserDto: UpdateRequestUserDto) {
    let { book_id } = updateRequestUserDto;
    let checkData = await this.prisma.req_user_booked.findMany({
      where: { book_id },
    });
    // console.log(checkData);
    if (checkData.length > 0) {
      return successCode({ data: "đơn hàng đang đợi admin duyệt" });
    } else {
      let data = await this.prisma.req_user_booked.update({
        where: { book_id },
        data: updateRequestUserDto,
      });
      return successCode({
        data,
        message: "đã gửi yêu cầu chỉnh sửa đơn hàng và đợi admin duyệt",
      });
    }
  }
  // ---- hủy yêu cầu của user thì chỉ có admin xóa được thôi
  async delete(id: number, iUser: number) {
    console.log(id);
    // console.log(iUser);
    let checkRole = await this.prisma.users.findFirst({ where: { id: iUser } });
    // console.log(checkRole);
    let { role } = checkRole;
    if ((role = "ADMIN")) {
      let detroy = await this.prisma.req_user_booked.delete({
        where: { book_id: id },
      });
      return successCode({ message: "hủy yêu cầu", data: "Admin đã hủy" });
    } else {
      return errorCode({ message: "không có quyền xóa" });
    }
  }
}
