import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Req,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "../users/dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response, Request } from "express";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Activation link emailga yuborildi",
    schema: {
      example: { message: "Foydalanuvchi yaratildi, emailni tekshiring" },
    },
  })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Foydalanuvchini aktivatsiya qilish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi aktivatsiya qilindi",
    schema: {
      example: { message: "Foydalanuvchi muvaffaqiyatli aktivatsiya qilindi" },
    },
  })
  async activate(@Param("link") link: string) {
    await this.authService.activate(link);
    return { message: "Foydalanuvchi muvaffaqiyatli aktivatsiya qilindi" };
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login qilish" })
  @ApiResponse({
    status: 200,
    description: "Tokenlar qaytariladi",
    schema: {
      example: { accessToken: "jwt_access_token_here" },
    },
  })
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(dto, res);
  }

  @Get("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh token orqali access token yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangi access token qaytariladi",
    schema: {
      example: { accessToken: "new_jwt_access_token_here" },
    },
  })
  async refresh(@Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(res);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Tizimdan chiqish (logout)" })
  @ApiResponse({
    status: 200,
    description: "Tizimdan chiqish muvaffaqiyatli amalga oshirildi",
    schema: {
      example: { message: "Tizimdan muvaffaqiyatli chiqdingiz" },
    },
  })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.refreshToken;
    return this.authService.logout(token, res);
  }
}
