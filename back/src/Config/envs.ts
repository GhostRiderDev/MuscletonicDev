import dotevn from "dotenv";
dotevn.config();

export const {
  SERVER_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  SECRET,
} = process.env;
