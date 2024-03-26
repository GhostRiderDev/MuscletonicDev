import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StepEntity } from "./StepEntity";
import { PartEntity } from "./PartEntity";

@Entity({ name: "Routine" })
export class RoutineEntity {
  @PrimaryGeneratedColumn("uuid")
  id_routine!: string;

  @Column({ type: "varchar", nullable: false, length: 50, unique: true })
  name!: string;

  @Column({ type: "varchar", nullable: false, length: 50 })
  description!: string;

  @Column({ type: "varchar", nullable: false, length: 200, unique: true })
  gif!: string;

  @Column({ type: "int", nullable: false })
  id_part!: number;

  @ManyToOne(() => PartEntity, (part) => part.routines)
  @JoinColumn({ name: "id_part" })
  part!: PartEntity;

  @OneToMany(() => StepEntity, (step) => step.routine, {
    cascade: true,
    lazy: false,
  })
  @JoinColumn({ name: "steps_id" })
  steps!: StepEntity[];
}
