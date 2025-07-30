import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Store } from "src/store/entities/store.entity";
import { Message } from "../../message/entities/message.entity";

@ObjectType()
@Entity("chat")
export class Chat {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique ID" })
  id: number;

  @Field(() => Int)
  @ApiProperty({ example: 2, description: "User ID" })
  @ManyToOne(() => User, (user) => user.chats, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field(() => Int)
  @ApiProperty({ example: 3, description: "Store ID" })
  @ManyToOne(() => Store, (store) => store.chats, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "store_id" })
  store: Store;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
