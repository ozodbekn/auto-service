import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { History } from "./entities/history.entity";
import { User } from "src/user/entities/user.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { HistoryService } from "./history.service";
import { HistoryController } from "./history.controller";
import { HistoryResolver } from "./history.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([History, User, Dermantin])],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryResolver],
})
export class HistoryModule {}
