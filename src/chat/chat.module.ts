import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";
import { User } from "src/user/entities/user.entity";
import { Store } from "src/store/entities/store.entity";
import { ChatResolver } from "./chat.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Store])],
  controllers: [ChatController],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
