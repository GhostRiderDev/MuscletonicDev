import express from "express";

import {
  getStep,
  getSteps,
  createStep,
  updateStep,
  deleteStep,
} from "../Controller/StepController";

const stepRouter = express.Router();

stepRouter.get("/", getSteps);
stepRouter.get("/:id", getStep);
stepRouter.post("/", createStep);
stepRouter.put("/:id", updateStep);
stepRouter.delete("/:id", deleteStep);

export default stepRouter;
