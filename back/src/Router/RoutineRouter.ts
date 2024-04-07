import express from "express";
import {
  getRoutine,
  getRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutineMuscle,
} from "../Controller/RoutineController";
import { isAdmin, verifyToken } from "../Middleware/token";

const routineRouter = express.Router();

routineRouter.get("/", verifyToken, getRoutines);
routineRouter.get("/:id", verifyToken, getRoutine);
routineRouter.post("/", isAdmin, createRoutine);
routineRouter.put("/:id", isAdmin, updateRoutine);
routineRouter.delete("/:id", isAdmin, deleteRoutine);
routineRouter.get("/part/:id_muscle", verifyToken, getAllRoutineMuscle);

export default routineRouter;
