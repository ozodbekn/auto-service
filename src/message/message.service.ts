import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Chat } from "src/chat/entities/chat.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private msgRepo: Repository<Message>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>
  ) {}

  async create(dto: CreateMessageDto): Promise<Message> {
    const chat = await this.chatRepo.findOneBy({ id: dto.chatId });
    if (!chat)
      throw new NotFoundException(`Chat with ID ${dto.chatId} not found`);

    const msg = this.msgRepo.create({
      chat,
      text: dto.text,
      is_read: dto.is_read,
    });

    return this.msgRepo.save(msg);
  }

  async findAll(): Promise<Message[]> {
    return this.msgRepo.find({ relations: ["chat"] });
  }

  async findOne(id: number): Promise<Message> {
    const msg = await this.msgRepo.findOne({
      where: { id },
      relations: ["chat"],
    });
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    return msg;
  }

  async update(id: number, dto: UpdateMessageDto): Promise<Message> {
    const msg = await this.findOne(id);

    if (dto.chatId) {
      const chat = await this.chatRepo.findOneBy({ id: dto.chatId });
      if (!chat)
        throw new NotFoundException(`Chat with ID ${dto.chatId} not found`);
      msg.chat = chat;
    }
    if (dto.text !== undefined) msg.text = dto.text;
    if (dto.is_read !== undefined) msg.is_read = dto.is_read;

    return this.msgRepo.save(msg);
  }

  async remove(id: number): Promise<void> {
    const msg = await this.findOne(id);
    await this.msgRepo.remove(msg);
  }
}
