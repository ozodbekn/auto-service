import { Resolver, Mutation, Query, Args, Int } from "@nestjs/graphql";
import { HistoryService } from "./history.service";
import { History } from "./entities/history.entity";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(@Args("createHistoryDto") dto: CreateHistoryDto) {
    return this.historyService.create(dto);
  }

  @Query(() => [History])
  getAllHistory() {
    return this.historyService.findAll();
  }

  @Query(() => History)
  getHistory(@Args("id", { type: () => Int }) id: number) {
    return this.historyService.findOne(id);
  }

  @Mutation(() => History)
  updateHistory(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateHistoryDto") dto: UpdateHistoryDto
  ) {
    return this.historyService.update(id, dto);
  }

  @Mutation(() => Boolean)
  deleteHistory(@Args("id", { type: () => Int }) id: number) {
    return this.historyService.remove(id).then(() => true);
  }
}
