import { NextFunction, Request, Response } from "express";
import logger from "../Util/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  
  switch (err.name) {
    case "ValidationError":
      res
        .status(400)
        .json({
          message: err.message,
        })
        .send();
      logger.err(err.name, err.message, err.stack as string);
      return;
    case "ResourceNotFoundError":
      res
        .status(404)
        .json({
          message: err.message,
        })
        .send();
      logger.err(err.name, err.message, err.stack as string);
      return;
    case "JsonWebTokenError":
      res.status(401).json({ error: "Invalid token" });
      return;
    case "TokenExpiredError":
      res.status(401).json({
        message: "token expired",
      });
      return;
    case "UnauthorizedError":
      res.status(401).json({ message: "Unauthorized access" });
      return;
    case "SyntaxError":
      res.status(401).json({ message: "Invalid token" });
      return;
    case "InvalidOperatioError":
      res.status(400).json({ message: err.message });
      return;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      return;
    case "TokenExpiredError":
      res.status(401).json({ message: "Token expired" });
      return;
    case "UnauthorizedError":
      res.status(401).json({ message: "Unauthorized access" });
      return;
    case "TypeError":
      res.status(400).json({ message: "Invalid entries" });
      return;
    default:
      res.status(500).json({ error: err.message });
      next(err);
  }
};

export default errorHandler;
