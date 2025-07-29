import { Request } from "express";
import { JwtPayload, JwtPayloadWithRefreshToken } from "../types";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from "passport-jwt";

export const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  if (req && req.cookies) {
    return req.cookies["refreshToken"];
  }
  return null;
};

@Injectable()
export class RefreshTokenCookieStrategy extends PassportStrategy(
  Strategy,
  "refresh-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.REFRESH_TOKEN_KEY!,
        passReqToCallback: true,
    });
  }
  validate(req: Request, payload: JwtPayload): JwtPayloadWithRefreshToken {
    console.log(`Salf`);
    const refreshToken = req.cookies["refreshToken"];
    console.log(`REfresh`,refreshToken);

    if (!refreshToken) {
      throw new ForbiddenException("Invalid Refresh Token");
    }
    return { ...payload, refreshToken };
  }
}
