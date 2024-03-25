import { NextFunction, Request, Response } from "express";

export const getRoutines = (
  __req: Request,
  res: Response,
  __next: NextFunction
) => {
  res.send("routines");
};

export const getRoutine = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("routine");
};

export const createRoutine = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("routine");
};

export const updateRoutine = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("routine");
};

export const deleteRoutine = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("routine");
};
