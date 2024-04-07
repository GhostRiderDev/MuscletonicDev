import { NextFunction, Request, Response } from "express";
import {
  findRoutines,
  findRoutine,
  addRoutine,
  removeRoutine,
  refreshRoutine,
  findAllRoutinesMuscle,
} from "../Service/RoutineService";
import { RoutineDTO } from "../DTO/RoutineDTO";
import { addSteps } from "../Service/StepService";
import { StepDTO } from "../DTO/StepDTO";
import { validateRoutine, validateUUID } from "../Service/validations";

export const getRoutines = async (
  __req: Request,
  res: Response<{ routines: RoutineDTO[] }>,
  next: NextFunction
) => {
  try {
    const routines: RoutineDTO[] = await findRoutines();
    res.status(200).json({ routines: routines }).send();
  } catch (err) {
    next(err);
  }
};

export const getAllRoutineMuscle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_muscle } = req.params;
    const allRoutinesMuscle = await findAllRoutinesMuscle(+id_muscle);
    res.status(200).json({ routines: allRoutinesMuscle }).send();
  } catch (err) {
    next(err);
  }
};

export const getRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    validateUUID(id);
    const routineDB = await findRoutine(id);
    res.status(200).send(routineDB);
  } catch (err) {
    next(err);
  }
};

export const createRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const routine: RoutineDTO = req.body.routine;

    validateRoutine(routine);

    const steps: StepDTO[] = routine.steps;

    const routineDB = await addRoutine(routine);

    const stepsWithRoutineId = steps.map((step) => {
      return { ...step, id_routine: routineDB.id_routine };
    });
    const stepsDB = await addSteps(stepsWithRoutineId as StepDTO[]);
    routineDB.steps = stepsDB;
    res.status(201).send(routineDB);
  } catch (err) {
    next(err);
  }
};

export const updateRoutine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateUUID(id);
    const { routine } = req.body;
    validateRoutine(routine);
    const routineDB = await refreshRoutine(id, routine);

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
    validateUUID(id);
    removeRoutine(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
