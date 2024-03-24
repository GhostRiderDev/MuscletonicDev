import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(morgan("dev"));
server.use(cors());

server.get("/ping", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send("PONG");
});

export default server;
