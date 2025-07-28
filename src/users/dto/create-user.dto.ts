import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchining to‘liq ismi",
  })
  full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqam (unikal)",
  })
  phone: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Email manzil (unikal)",
  })
  email: string;


  @ApiProperty({
    example: "f60d7339-9fd5-4c00-8470-282d173e63c5",
    description: "Aktivatsiya havolasi",
  })
  activationLink: string;

  @ApiProperty({ example: false, description: "Aktivatsiya qilinganmi" })
  isActivated?: boolean;

  @ApiProperty({
    example: false,
    description: "Admin tomonidan tasdiqlanganmi",
  })
  isApproved?: boolean;

  @ApiProperty({
    example: Role.WORKER,
    enum: Role,
    description: "Foydalanuvchi roli",
  })
  role?: Role;

  @ApiProperty({ example: "refresh_token_value", description: "Refresh token" })
  refreshToken?: string;
}
