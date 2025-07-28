import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAdminDto) {
    return this.prisma.admin.create({ data });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  findOne(id: number) {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.admin.delete({ where: { id } });
  }
}
