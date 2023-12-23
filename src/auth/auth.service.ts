import { HttpException, Injectable } from "@nestjs/common";
import { CreateAuthDto, LoginAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { errorCode, successCode } from "src/utils/resClient";
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
      let newUser = { ...body, pass_word: newPass, role: newRole };
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
        return {
          status: 200,
          message: "đăng nhập thành công",
          content: infoUser,
          access_token: token,
          refresh_token: token,
          dateTime: new Date(),
        };
      } else {
       return errorCode({ data: "Yêu cầu không hợp lệ!,mật khẩu không đúng" });
      }
    } else {
     return errorCode({ data: "Yêu cầu không hợp lệ!,email không đúng" });
    }
  }
}
