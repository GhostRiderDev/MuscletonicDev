import { NextFunction, Request, Response } from "express";
import {
  findRoutines,
  findRoutine,
  addRoutine,
  removeRoutine,
  refreshRoutine,
} from "../Service/RoutineService";

export const getRoutines = async (
  __req: Request,
  res: Response,
  __next: NextFunction
) => {
  const routinesDB = await findRoutines();
  res.status(200).send(routinesDB);
};

export const getRoutine = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const routineDB = findRoutine(id);
    res.status(200).send(routineDB);
  } catch (err) {
    next(err);
  }
};

export const createRoutine = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { routine } = req.body;
  const routineDB = addRoutine(routine);
  res.status(201).send(routineDB);
};

export const updateRoutine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { routine } = req.body;
    const routineDB = refreshRoutine(id, routine);
    res.status(200).send(routineDB);
  } catch (err) {
    next(err);
  }
};

export const deleteRoutine = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    removeRoutine(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
