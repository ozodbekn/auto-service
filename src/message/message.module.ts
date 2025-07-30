import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Chat } from "src/chat/entities/chat.entity";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { MessageResolver } from "./message.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [MessageController],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
