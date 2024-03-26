import { Request, Response, NextFunction } from "express";
import { page404 } from "../templates/404";

const unknowEnpoint = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send(page404());
};
export default unknowEnpoint;
