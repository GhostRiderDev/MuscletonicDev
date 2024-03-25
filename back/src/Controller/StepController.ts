import { NextFunction, Request, Response } from "express";
import {
  findSteps,
  findStep,
  addStep,
  refreshStep,
  removeStep,
} from "../Service/StepService";

export const getSteps = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const stepsDB = await findSteps();
  res.status(200).send(stepsDB);
};

export const getStep = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const stepDB = findStep(id);
    res.status(200).send(stepDB);
  } catch (err) {
    next(err);
  }
};

export const createStep = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { step } = req.body;
  const stepDB = await addStep(step);
  res.status(201).send(stepDB);
};

export const updateStep = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { step } = req.body;
    const stepDB = refreshStep(id, step);
    res.status(200).send(stepDB);
  } catch (err) {
    next(err);
  }
};

export const deleteStep = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    removeStep(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
