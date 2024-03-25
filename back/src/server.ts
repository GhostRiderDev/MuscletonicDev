import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./Router/userRouter";
import routineRouter from "./Router/RoutineRouter";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/users", userRouter);
server.use("/routines", routineRouter);

export default server;
