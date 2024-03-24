import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./Entity/UserEntity";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./Config/envs";
import { RoutineEntity } from "./Entity/RoutineEntity";
import { StepEntity } from "./Entity/StepEntity";
import { PartEntity } from "./Entity/PartEntity";
import CredentialEntity from "./Entity/CredentialEntity";

const host = DB_HOST || "localhost";
const port = DB_PORT ? parseInt(DB_PORT) : 5432;
const username = DB_USER || "";
const password = DB_PASSWORD || "";
const database = DB_NAME || "";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: ["error"],
  entities: [
    UserEntity,
    RoutineEntity,
    StepEntity,
    PartEntity,
    CredentialEntity,
  ],
  migrations: [],
  subscribers: [],
});
