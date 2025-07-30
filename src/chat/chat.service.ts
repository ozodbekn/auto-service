import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { User } from "src/user/entities/user.entity";
import { Store } from "src/store/entities/store.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Store) private storeRepo: Repository<Store>
  ) {}
  async create(dto: CreateChatDto): Promise<Chat> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    const store = await this.storeRepo.findOneBy({ id: dto.storeId });

    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }
    if (!store) {
      throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
    }

    const chat = this.chatRepo.create({
      user: user,
      store: store,
    });

    return this.chatRepo.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepo.find();
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.chatRepo.findOne({ where: { id } });
    if (!chat) throw new NotFoundException("Chat not found");
    return chat;
  }

  async update(id: number, dto: UpdateChatDto): Promise<Chat> {
    const chat = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOneBy({ id: dto.userId });
      if (!user)
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      chat.user = user;
    }

    if (dto.storeId) {
      const store = await this.storeRepo.findOneBy({ id: dto.storeId });
      if (!store)
        throw new NotFoundException(`Store with ID ${dto.storeId} not found`);
      chat.store = store;
    }

    return this.chatRepo.save(chat);
  }

  async remove(id: number): Promise<void> {
    const chat = await this.findOne(id);
    await this.chatRepo.remove(chat);
  }
}
