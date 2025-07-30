import { InputType, PartialType, Field, Int } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt } from "class-validator";
import { CreateHistoryDto } from "./create-history.dto";

@InputType()
export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 1, description: "User ID" })
  @IsOptional()
  @IsInt()
  userId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 2, description: "Dermantin ID" })
  @IsOptional()
  @IsInt()
  dermantinId?: number;
}
