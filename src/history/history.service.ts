import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { History } from "./entities/history.entity";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { User } from "src/user/entities/user.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepo: Repository<History>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Dermantin) private dermantinRepo: Repository<Dermantin>
  ) {}

  async create(dto: CreateHistoryDto): Promise<History> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    const dermantin = await this.dermantinRepo.findOneBy({
      id: dto.dermantinId,
    });

    if (!user) throw new NotFoundException(`User not found`);
    if (!dermantin) throw new NotFoundException(`Dermantin not found`);

    const history = this.historyRepo.create({ user, dermantin });
    return this.historyRepo.save(history);
  }

  async findAll(): Promise<History[]> {
    return this.historyRepo.find({ relations: ["user", "dermantin"] });
  }

  async findOne(id: number): Promise<History> {
    const history = await this.historyRepo.findOne({
      where: { id },
      relations: ["user", "dermantin"],
    });
    if (!history) throw new NotFoundException("History not found");
    return history;
  }

  async update(id: number, dto: UpdateHistoryDto): Promise<History> {
    const history = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOneBy({ id: dto.userId });
      if (!user) throw new NotFoundException("User not found");
      history.user = user;
    }

    if (dto.dermantinId) {
      const dermantin = await this.dermantinRepo.findOneBy({
        id: dto.dermantinId,
      });
      if (!dermantin) throw new NotFoundException("Dermantin not found");
      history.dermantin = dermantin;
    }

    return this.historyRepo.save(history);
  }

  async remove(id: number): Promise<void> {
    const history = await this.findOne(id);
    await this.historyRepo.remove(history);
  }
}
