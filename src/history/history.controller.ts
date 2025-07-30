import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("History")
@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiOperation({ summary: "Create history entry" })
  @ApiResponse({ status: 201, description: "History created" })
  create(@Body() dto: CreateHistoryDto) {
    return this.historyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all history records" })
  findAll() {
    return this.historyService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one history record" })
  findOne(@Param("id") id: string) {
    return this.historyService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a history record" })
  update(@Param("id") id: string, @Body() dto: UpdateHistoryDto) {
    return this.historyService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a history record" })
  remove(@Param("id") id: string) {
    return this.historyService.remove(+id);
  }
}
