import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        full_name: dto.full_name,
        phone: dto.phone,
        email: dto.email,
        activationLink: dto.activationLink,
        role: dto.role || "WORKER",
        isActivated: dto.isActivated ?? false,
        isApproved: dto.isApproved ?? false,
        refreshToken: dto.refreshToken ?? "",
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
