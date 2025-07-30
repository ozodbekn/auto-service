import { InputType, Int, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

@InputType()
export class CreateHistoryDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "User ID" })
  @IsInt()
  userId: number;

  @Field(() => Int)
  @ApiProperty({ example: 2, description: "Dermantin ID" })
  @IsInt()
  dermantinId: number;
}
