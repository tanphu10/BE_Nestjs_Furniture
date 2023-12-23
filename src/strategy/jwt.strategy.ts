import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "BIMAT",
    });
  }

  async validate(decodeToken: any) {
    const currentTime = Date.now() / 1000;
    if (decodeToken.exp < currentTime) {
      return { status: 400, message: "token đã hết hạn" };
    } else {
      return decodeToken;
    }
  }
}
