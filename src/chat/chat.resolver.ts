import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Chat)
  createChat(@Args("createChatDto") createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Query(() => [Chat], { name: "getAllChats" })
  findAll() {
    return this.chatService.findAll();
  }

  @Query(() => Chat, { name: "getChat" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateChatDto") dto: UpdateChatDto
  ) {
    return this.chatService.update(id, dto);
  }

  @Mutation(() => Boolean)
  removeChat(@Args("id", { type: () => Int }) id: number) {
    return this.chatService.remove(id).then(() => true);
  }
}
