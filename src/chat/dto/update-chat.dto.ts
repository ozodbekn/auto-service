import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateChatDto } from "./create-chat.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

@InputType()
export class UpdateChatDto extends PartialType(CreateChatDto) {
  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 1, description: "User ID" })
  userId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 2, description: "Store ID" })
  storeId?: number;
}
