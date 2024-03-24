import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { RoutineEntity } from "./RoutineEntity";

@Entity({ name: "Part" })
export class PartEntity {
  @PrimaryColumn({ type: "int", nullable: false })
  id_part!: number;

  @Column({ type: "varchar", nullable: false, length: 50 })
  name!: string;

  @Column({ type: "varchar", nullable: false, length: 50 })
  category!: string;

  @OneToMany(() => RoutineEntity, (routine) => routine.part)
  routines!: RoutineEntity[];
}
