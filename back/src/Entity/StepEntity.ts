import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RoutineEntity } from "./RoutineEntity";

@Entity({ name: "Step" })
export class StepEntity {
  @PrimaryGeneratedColumn("uuid")
  id_step!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  content!: string;

  @Column({ type: "int", nullable: false })
  order!: number;

  @Column({ type: "varchar", nullable: false })
  routine_id!: string;

  @ManyToOne(() => RoutineEntity, (routine) => routine.steps)
  @JoinColumn({ name: "routine_id" })
  routine!: RoutineEntity;
}
