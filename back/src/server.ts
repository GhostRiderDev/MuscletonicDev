import express from "express";
import morgan from "morgan";
import cors from "cors";
import UserRouter from "./Router/UserRouter";
import routineRouter from "./Router/RoutineRouter";
import errorHandler from "./Middleware/errorHandler";
import unknowEnpoint from "./Middleware/unknowEnpoint";
import AuthRouter from "./Router/AuthRouter";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/users", UserRouter);
server.use("/routines", routineRouter);
server.use("/auth", AuthRouter);

server.use(errorHandler);
server.use("*", unknowEnpoint);

export default server;
