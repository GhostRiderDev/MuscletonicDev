import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import CredentialEntity from "./CredentialEntity";
import { RoutineEntity } from "./RoutineEntity";
import { Role } from "../Interface/IUser";

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryColumn({ type: "varchar", length: 20, nullable: false, unique: true })
  dni!: string;

  @Column({ type: "varchar", nullable: false, length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  firstName!: string;

  @Column({ type: "varchar", nullable: true, length: 100 })
  lastName!: string;

  @Column({ type: "varchar", nullable: true })
  id_credential!: string;

  @Column({ type: "enum", nullable: false, enum: ["admin", "user"] })
  role!: Role;

  @ManyToMany(() => RoutineEntity, { lazy: true, cascade: false })
  @JoinTable({
    name: "FavoriteRoutines",
    joinColumn: { name: "dni" },
    inverseJoinColumn: { name: "id_routine" },
  })
  routines!: RoutineEntity[];

  @OneToOne(() => CredentialEntity, { cascade: true })
  @JoinColumn({ name: "id_credential" })
  credential!: CredentialEntity;
}
