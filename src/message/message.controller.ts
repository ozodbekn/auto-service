import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Message")
@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: "Create message" })
  @ApiResponse({ status: 201, description: "Message created" })
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all messages" })
  findAll() {
    return this.messageService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one message by ID" })
  findOne(@Param("id") id: string) {
    return this.messageService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a message" })
  update(@Param("id") id: string, @Body() dto: UpdateMessageDto) {
    return this.messageService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a message" })
  remove(@Param("id") id: string) {
    return this.messageService.remove(+id);
  }
}
