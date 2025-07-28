import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MailService } from "../mail/mail.service";
import { CreateUserDto, LoginUserDto } from "../users/dto";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService
  ) {}

  async register(dto: CreateUserDto) {
    try {
      const candidate = await this.prisma.users.findUnique({
        where: { email: dto.email },
      });

      if (candidate) {
        throw new ForbiddenException("Bu email allaqachon ro'yxatdan o'tgan");
      }

      const activationLink = uuidv4();

      const user = await this.prisma.users.create({
        data: {
          full_name: dto.full_name,
          phone: dto.phone,
          email: dto.email,
          activationLink,
          role: dto.role || "WORKER",
          isActivated: false,
          isApproved: false,
          refreshToken: "",
        },
      });

      await this.mailService.sendActivationLink(user.email, activationLink);

      return { message: "Foydalanuvchi yaratildi, emailni tekshiring" };
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  async activate(link: string) {
    const user = await this.prisma.users.findFirst({
      where: { activationLink: link },
    });

    if (!user) {
      throw new ForbiddenException("Noto'g'ri aktivatsiya linki");
    }

    await this.prisma.users.update({
      where: { id: user.id },
      data: { isActivated: true },
    });

    return { message: "Foydalanuvchi muvaffaqiyatli aktivatsiya qilindi" };
  }

  async login(dto: LoginUserDto, res: Response) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException("Email topilmadi");

    if (!user.isActivated)
      throw new UnauthorizedException("Account aktivatsiya qilinmagan");

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.prisma.users.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  async refresh(res: Response) {
    const refreshToken = res.req.cookies?.refreshToken;
    if (!refreshToken) throw new UnauthorizedException("Token yo'q");

    const user = await this.prisma.users.findFirst({
      where: { refreshToken },
    });

    if (!user) throw new UnauthorizedException("Refresh token noto'g'ri");

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.prisma.users.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.config.get("REFRESH_TOKEN_KEY"),
      });
    } catch {
      return null;
    }
  }

  async logout(token: string, res: Response) {
    if (!token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    const userData = await this.jwtService
      .verifyAsync(token, {
        secret: this.config.get("REFRESH_TOKEN_KEY"),
      })
      .catch(() => {
        throw new UnauthorizedException("Token noto‘g‘ri yoki muddati o‘tgan");
      });

    if (!userData) {
      throw new ForbiddenException("Ruxsat yo‘q");
    }

    await this.prisma.users.update({
      where: { id: userData.sub },
      data: { refreshToken: null },
    });

    res.clearCookie("refreshToken", { httpOnly: true });

    return { message: "Tizimdan muvaffaqiyatli chiqdingiz" };
  }

  async generateTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get("ACCESS_TOKEN_KEY"),
      expiresIn: this.config.get("ACCESS_TOKEN_TIME"),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get("REFRESH_TOKEN_KEY"),
      expiresIn: this.config.get("REFRESH_TOKEN_TIME"),
    });

    return { accessToken, refreshToken };
  }
}
