import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "Ali Valiyev" })
  full_name: string;

  @ApiProperty({ example: "+998901234567" })
  phone: string;

  @ApiProperty({ example: "ali@example.com" })
  email: string;

  @ApiProperty({ example: false })
  isCreator?: boolean;
}
