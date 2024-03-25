import { NextFunction, Request, Response } from "express";

export const getUsers = (_req: Request, res: Response, _next: NextFunction) => {
  res.send("users");
};

export const getUser = (_req: Request, res: Response, _next: NextFunction) => {
  res.send("user");
};

export const register = (_req: Request, res: Response, _next: NextFunction) => {
  res.send("user");
};

export const updateUser = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("user");
};

export const deleteUser = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.send("user");
};
