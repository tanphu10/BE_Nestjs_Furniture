import { HttpException, Injectable } from "@nestjs/common";
import {
  CreateAuthDto,
  LoginAuthDto,
  LoginAuthSocial,
} from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successAuthCode, successCode } from "src/utils/resClient";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async signup(body: CreateAuthDto) {
    console.log("check post auth >>>", body);
    let { email, pass_word } = body;
    console.log(pass_word);
    let checkData = await this.prisma.users.findMany({
      where: { email },
    });
    console.log(checkData);

    if (checkData.length > 0) {
      return errorCode({ data: "email đã tồn tại" });
    } else {
      let newPass = bcrypt.hashSync(pass_word, 10);

      console.log("newpass", newPass);
      let newRole = "USER";
      let newType = "credentials";
      let newUser = {
        ...body,
        pass_word: newPass,
        role: newRole,
        type_: newType,
      };
      // console.log("newUser", newUser);
      let data = await this.prisma.users.create({ data: newUser });
      console.log("check data", data);
      return successCode({ message: "Đăng kí thành công", data });
    }
  }

  async signin(body: LoginAuthDto) {
    let { email, pass_word } = body;
    let checkData = await this.prisma.users.findFirst({ where: { email } });
    let infoUser = { ...checkData, pass_word: " " };
    if (checkData) {
      let checkPass = bcrypt.compareSync(pass_word, checkData.pass_word);
      if (checkPass) {
        let token = this.jwtService.sign(
          { data: checkData },
          { expiresIn: "1y", secret: "BIMAT" }
        );
        return successAuthCode({
          status: 200,
          message: "đăng nhập thành công",
          data: infoUser,
          token: token,
          retoken: token,
          dateTime: new Date(),
        });
      } else {
        return errorCode({ data: "Yêu cầu không hợp lệ!,mật khẩu không đúng" });
      }
    } else {
      return errorCode({ data: "Yêu cầu không hợp lệ!,email không đúng" });
    }
  }
  async loginsocial(body: LoginAuthSocial) {
    console.log(body);
    let { email, type_ } = body;
    let checkData = await this.prisma.users.findFirst({ where: { email } });
    console.log("checkData", checkData);
    if (checkData) {
      let token = this.jwtService.sign(
        { data: checkData },
        { expiresIn: "1y", secret: "BIMAT" }
      );
      // console.log(token);
      return successAuthCode({
        status: 200,
        message: "đăng nhập thành công",
        data: checkData,
        token: token,
        retoken: token,
        dateTime: new Date(),
      });
    } else {
      let newUser = {
        ...body,
        role: "USER",
        pass_word: "",
        full_name: "",
        phone: "",
        birth_day: "2023-12-25T04:17:44.657Z",
        gender: true,
        avatar: "",
        address: "",
        isverify: true,
      };
      // console.log(newUser);
      let newData = await this.prisma.users.create({ data: newUser });
      let token = this.jwtService.sign(
        { data: newData },
        { expiresIn: "1y", secret: "BIMAT" }
      );
      return successAuthCode({
        status: 200,
        message: "đăng nhập thành công",
        data: newData,
        token: token,
        retoken: token,
        dateTime: new Date(),
      });
    }
  }
}
