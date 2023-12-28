import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class LikesService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createLikeDto: CreateLikeDto) {
    let { item_id, user_id } = createLikeDto;
    let checkItem = await this.prisma.items.findFirst({
      where: { id: item_id },
    });
    let checkUser = await this.prisma.users.findFirst({
      where: { id: user_id },
    });

    if (!checkItem && !checkUser) {
      return errorCode({ message: "user hoặc item không tồn tại" });
    } else {
      let checkData = await this.prisma.likes.findFirst({
        where: { item_id, user_id },
      });
      // console.log(checkData);
      if (!checkData) {
        let like = { ...createLikeDto, quantity: true };
        console.log(like);
        let newData = await this.prisma.likes.create({
          data: like,
        });
        console.log("newData", newData);
        return successCode({ data: newData, message: "like thành công" });
      } else {
        if (checkData.quantity) {
          let dislike = { ...CreateLikeDto, quantity: false };
          let newData = await this.prisma.likes.updateMany({
            data: dislike,
            where: { item_id, user_id },
          });
          return successCode({ data: newData, message: "dislike thành công" });
        } else {
          let like = { ...CreateLikeDto, quantity: true };
          let newData = await this.prisma.likes.updateMany({
            data: like,
            where: { item_id, user_id },
          });
          return successCode({ data: newData, message: "like thành công" });
        }
      }
    }
  }

  async findAll() {
    let data = await this.prisma.likes.findMany({ where: { quantity: true } });
    return successCode({ data, message: "get all like thành công" });
  }

  async findItem(id: number) {
    let checkData = await this.prisma.likes.findMany({
      where: { item_id: id },
    });
    // console.log(checkData);
    if (checkData.length > 0) {
      let data = await this.prisma.likes.findMany({
        where: {
          item_id: id,
          quantity: true,
        },
      });
      // console.log(data);
      return successCode({
        data,
        message: "get like by item thành công",
      });
    } else {
      return successCode({ data: [], message: "item không tồn tại" });
    }
  }
  async findUser(id: number) {
    // console.log(id);
    let checkData = await this.prisma.users.findMany({
      where: { id },
    });
    // console.log(checkData);
    if (checkData.length > 0) {
      let data = await this.prisma.likes.findMany({
        where: {
          user_id: id,
          quantity: true,
        },
        include: { items: true },
      });
      // console.log(data);
      return successCode({
        data,
        message: "get like by user thành công",
      });
    } else {
      return successCode({ data: [], message: "user không tồn tại" });
    }
  }
}
