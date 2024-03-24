import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./Entity/User";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./Config/envs";

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
  entities: [User],
  migrations: [],
  subscribers: [],
});
