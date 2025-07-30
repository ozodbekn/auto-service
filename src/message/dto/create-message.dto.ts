import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

@InputType()
export class CreateMessageDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Chat ID" })
  @IsInt()
  chatId: number;

  @Field(() => String)
  @ApiProperty({ example: "Hello world!", description: "Message content" })
  @IsString()
  text: string;

  @Field(() => Boolean)
  @ApiProperty({ example: false, description: "Is message read?" })
  @IsBoolean()
  is_read: boolean;
}
