import { Resolver, Mutation, Args, Query, Int } from "@nestjs/graphql";
import { MessageService } from "./message.service";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(@Args("createMessageDto") dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  @Query(() => [Message])
  getAllMessages() {
    return this.messageService.findAll();
  }

  @Query(() => Message)
  getMessage(@Args("id", { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateMessageDto") dto: UpdateMessageDto
  ) {
    return this.messageService.update(id, dto);
  }

  @Mutation(() => Boolean)
  deleteMessage(@Args("id", { type: () => Int }) id: number) {
    return this.messageService.remove(id).then(() => true);
  }
}
