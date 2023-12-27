import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  CreateAuthDto,
  LoginAuthDto,
  LoginAuthSocial,
} from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { response } from "express";

@Controller("api")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/auth/signup")
  @HttpCode(HttpStatus.CREATED)
  // @UseFilters(HttpExceptionFilter)
  create(@Body() body: CreateAuthDto) {
    try {
      // if(response.status)
      return this.authService.signup(body);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "This is a custom message",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        }
      );
    }
  }

  @Post("/auth/signin")
  signin(@Body() body: LoginAuthDto) {
    return this.authService.signin(body);
  }
  @Post("/auth/social-media")
  loginsocial(@Body() body: LoginAuthSocial) {
    return this.authService.loginsocial(body);
  }
}
