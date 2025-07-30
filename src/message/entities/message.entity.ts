import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Chat } from "src/chat/entities/chat.entity";

@ObjectType()
@Entity("message")
export class Message {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique message ID" })
  id: number;

  @Field(() => String)
  @Column()
  @ApiProperty({ example: "Hello!", description: "Message text" })
  text: string;

  @Field(() => Boolean)
  @Column({ default: false })
  @ApiProperty({ example: false, description: "Read status" })
  is_read: boolean;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: "CASCADE" })
  @JoinColumn({ name: "chat_id" })
  @ApiProperty({ type: () => Chat, description: "Related Chat" })
  chat: Chat;
}
