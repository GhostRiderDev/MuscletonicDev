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

  @Column({ type: "varchar", nullable: false, length: 50 })
  name!: string;

  @Column({ type: "varchar", nullable: false, length: 50 })
  description!: string;

  @Column({ type: "varchar", nullable: false, length: 200 })
  gif!: string;

  @Column()
  id_part!: string;

  @ManyToOne(() => PartEntity, (part) => part.routines)
  @JoinColumn({ name: "id_part" })
  part!: PartEntity;

  @OneToMany(() => StepEntity, (step) => step.routine, { cascade: true })
  @JoinColumn({ name: "steps_id" })
  steps!: StepEntity[];
}
