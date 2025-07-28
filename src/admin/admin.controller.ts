import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Patch,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlar ro'yxati" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati qaytarildi" })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta adminni olish" })
  @ApiResponse({ status: 200, description: "Admin topildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiResponse({ status: 200, description: "Admin muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.update(+id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({ status: 204, description: "Admin o'chirildi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
