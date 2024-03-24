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

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryColumn({ type: "varchar", length: 20 })
  dni!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  email!: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  firstName!: string;

  @Column({ type: "varchar", nullable: true, length: 100 })
  lastName!: string;

  @Column({ type: "varchar", nullable: true })
  credential_id!: string;

  @Column({ type: "enum", nullable: false, enum: ["admin", "user"] })
  role!: string;

  @ManyToMany(() => RoutineEntity, { lazy: true, cascade: false })
  @JoinTable()
  routines!: RoutineEntity[];

  @OneToOne(() => CredentialEntity, { cascade: true })
  @JoinColumn({ name: "credential_id" })
  credential!: CredentialEntity;
}
