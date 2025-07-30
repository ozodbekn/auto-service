import { InputType, Int, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreateChatDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "User ID" })
  userId: number;

  @Field(() => Int)
  @ApiProperty({ example: 2, description: "Store ID" })
  storeId: number;
}
