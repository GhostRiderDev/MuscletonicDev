import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./Router/userRouter";
import routineRouter from "./Router/RoutineRouter";
import stepRouter from "./Router/stepRouter";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/users", userRouter);
server.use("/routines", routineRouter);
server.use("/steps", stepRouter);

export default server;
