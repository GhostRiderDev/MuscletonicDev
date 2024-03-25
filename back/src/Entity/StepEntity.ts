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

  @Column({ type: "uuid", nullable: false })
  id_routine!: string;

  @ManyToOne(() => RoutineEntity, (routine) => routine.steps, { lazy: false })
  @JoinColumn({ name: "id_routine" })
  routine!: RoutineEntity;
}
