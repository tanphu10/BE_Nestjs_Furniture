import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";
import * as bcrypt from "bcrypt";
import { toiUuHinh } from "src/utils/upload";

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(createUserDto: CreateUserDto) {
    // console.log(createUserDto)
    let { email, pass_word, role } = createUserDto;
    let checkData = await this.prisma.users.findMany({ where: { email } });
    let newPass = bcrypt.hashSync(pass_word, 10);
    let newUser = { ...createUserDto, pass_word: newPass };
    console.log(checkData);
    if (role == "USER" || role == "ADMIN") {
      if (checkData.length > 0) {
        return errorCode({ data: "email đã tồn tại" });
      } else {
        let data = await this.prisma.users.create({ data: newUser });
        return {
          status: 201,
          message: "create user thành công",
          content: data,
          dateTime: new Date(),
        };
      }
    } else {
      return {
        status: 400,
        message: "role không đúng chỉ được tạo là USER hoặc ADMIN",
        dateTime: new Date(),
      };
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.users.findMany();
      console.log(data);
      return successCode({
        message: "get all user thành công",
        data: data,
      });
    } catch (error) {
      errorCode({ message: error });
    }
  }

  async findOne(id: number) {
    console.log(id);
    let data = await this.prisma.users.findFirst({ where: { id: id } });
    let newData = { ...data, pass_word: "" };
    console.log(newData);
    return successCode({
      message: "get user by id thành công",
      data: newData,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let { pass_word } = updateUserDto;
    let user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      return "user không tồn tại";
    } else {
      let newPass = bcrypt.hashSync(pass_word, 10);
      let newUser = { ...updateUserDto, pass_word: newPass };
      let data = await this.prisma.users.update({
        data: newUser,
        where: { id },
      });
      return {
        status: 200,
        message: "update user thành công",
        content: data,
        dateTime: new Date(),
      };
    }
  }

  async remove(id: number) {
    await this.prisma.book_item.deleteMany({
      where: { user_id: id },
    });
    await this.prisma.comments.deleteMany({
      where: { user_id: id },
    });
    let data = await this.prisma.users.findFirst({ where: { id } });
    if (data) {
      await this.prisma.users.delete({ where: { id } });
      return {
        status: 200,
        message: ` đã xóa thành công ${id}`,
        dateTime: new Date(),
      };
    } else {
      return {
        status: 201,
        message: `user không tồn tại`,
        dateTime: new Date(),
      };
    }
  }
  async search(userName: string) {
    let data = await this.prisma.users.findMany({
      where: { full_name: { contains: userName } },
    });
    if (data.length > 0) {
      return {
        status: 200,
        message: "danh sách user",
        content: data,
        dateTime: new Date(),
      };
    } else {
      return {
        status: 401,
        message: "không tìm thấy data",
        dateTime: new Date(),
      };
    }
  }
  async pagina(page: number, pageSize: number, userName: string) {
    let index = (page - 1) * pageSize;
    let data = await this.prisma.users.findMany({
      skip: index,
      take: +pageSize,
      where: {
        full_name: {
          contains: userName,
        },
      },
    });
    return {
      status: 200,
      message: "get theo trang thành công",
      content: data,
      dateTime: new Date(),
    };
  }
  async uploadAvatar(token: string, file: Express.Multer.File) {
    // console.log("check data=>>", process.cwd());
    let decodeToken: any = this.jwtService.decode(token);
    // console.log(decodeToken.data);
    // console.log('file', file);
    // let imageBase = await toiUuHinh(file);
    // console.log(imageBase);
    let user = decodeToken.data;
    let { id } = decodeToken.data;
    let newUser = { ...user, avatar: file.filename };
    let updateAvt = await this.prisma.users.update({
      data: newUser,
      where: { id },
    });
    // console.log(updateAvt);
    return {
      status: 200,
      message: "upload avatar thành công",
      content: updateAvt,
      dateTime: new Date(),
    };
  }
}
