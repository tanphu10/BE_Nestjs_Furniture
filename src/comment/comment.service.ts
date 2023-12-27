import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";

@Injectable()
export class CommentService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createCommentDto: CreateCommentDto) {
    // console.log(createCommentDto);
    let { item_id, user_id } = createCommentDto;
    let checkItem = await this.prisma.items.findFirst({
      where: { id: item_id },
    });
    let checkUser = await this.prisma.users.findFirst({
      where: { id: user_id },
    });
    if (checkItem && checkUser) {
      let data = await this.prisma.comments.create({ data: createCommentDto });
      return successCode({ data, message: "create comment thành công" });
    } else {
      return errorCode({ data: "user hoặc item không tồn tại" });
    }
  }

  async findAll() {
    let data = await this.prisma.comments.findMany();
    return successCode({ data, message: "get all comment thành công" });
  }

  async findItem(item_id: number) {
    // console.log(item_id);
    let data = await this.prisma.comments.findMany({
      where: { item_id },
      include: { users: true },
    });
    // console.log(data);vertical
    return successCode({
      data,
      message: "get all comment  by item_id thành công",
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let { item_id, user_id } = updateCommentDto;
    let checkItem = await this.prisma.items.findFirst({
      where: { id: item_id },
    });
    let checkUser = await this.prisma.users.findFirst({
      where: { id: user_id },
    });
    if (checkItem && checkUser) {
      let data = await this.prisma.comments.update({
        where: { id },
        data: updateCommentDto,
      });
      return successCode({ data, message: "update comment thành công" });
    } else {
      return errorCode({ data: "user hoặc item không tồn tại" });
    }
  }

  async remove(id: number) {
    let checkItem = await this.prisma.comments.findFirst({
      where: { id },
    });
    if (!checkItem) {
      return errorCode({ data: "id không tồn tại" });
    } else {
      await this.prisma.comments.delete({ where: { id } });
      return successCode({ message: "update comment thành công" });
    }
  }
}
