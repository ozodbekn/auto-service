import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateMessageDto } from "./create-message.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Field(() => String, { nullable: true })
  @ApiPropertyOptional({ example: "Updated message" })
  @IsOptional()
  text?: string;

  @Field(() => Boolean, { nullable: true })
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  is_read?: boolean;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  chatId?: number;
}
