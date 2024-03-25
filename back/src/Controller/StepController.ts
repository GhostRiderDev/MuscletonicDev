import { NextFunction, Request, Response } from "express";

export const getSteps = (_req: Request, res: Response, _next: NextFunction) => {
  res.send("steps");
};

export const getStep = (_req: Request, res: Response, _next: NextFunction) => {
  res.send("step");
};

export const createStep = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("step");
};

export const updateStep = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("step");
};

export const deleteStep = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("step");
};
