import express from "express";
import {
  getRoutine,
  getRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from "../Controller/RoutineController";

const routineRouter = express.Router();

routineRouter.get("/", getRoutines);
routineRouter.get("/:id", getRoutine);
routineRouter.post("/", createRoutine);
routineRouter.put("/:id", updateRoutine);
routineRouter.delete("/:id", deleteRoutine);

export default routineRouter;
