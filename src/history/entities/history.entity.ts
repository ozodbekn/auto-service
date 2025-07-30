import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";

@ObjectType()
@Entity("history")
export class History {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique history ID" })
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.histories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  @ApiProperty({ type: () => User, description: "User reference" })
  user: User;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (derm) => derm.histories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "dermantain_id" })
  @ApiProperty({ type: () => Dermantin, description: "Dermantin reference" })
  dermantin: Dermantin;
}
