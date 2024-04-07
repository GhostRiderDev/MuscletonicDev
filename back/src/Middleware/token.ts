import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../Config/envs";
import ValidationError from "../Error/ValidationError";
import { validateUUID } from "../Service/validations";
import { findUser } from "../Service/UserService";
import UserDTO from "../DTO/UserDTO";
import { Role } from "../Interface/IUser";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import errorHandler from "./errorHandler";
export function decodeToken(token: string) {
  return jwt.verify(token, SECRET as string);
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFrom(req);
    if (!token) {
      throw new ValidationError("Token cannot be empty");
    }

    const decodedToken: JwtPayload | string = decodeToken(token);

    if (typeof decodedToken === "string") {
      throw new ValidationError("Invalid token");
    }
    if (!decodedToken.dni) {
      throw new ValidationError("Invalid token");
    }
    return next();
  } catch (error) {
    // Si es un error de validación, manejarlo usando errorHandler
    if (error instanceof ValidationError) {
      return errorHandler(error, req, res, next);
    }
  }
};

export const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.slice(7);
  }
  return null;
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFrom(req);
    if (!token) {
      throw new ValidationError("Token not can be empty");
    }

    const decodedToken: JwtPayload | string = jwt.verify(
      token,
      SECRET as string
    );

    if (typeof decodedToken === "string") {
      throw new ValidationError("Invalid token");
    }
    const user: UserDTO = await findUser(decodedToken.id_user);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    if (user.role !== Role.ADMIN) {
      return res.status(401).json({ error: "Unauthorized access" }).send();
    }

    return next();
  } catch (error) {
    // Si es un error de validación o no se encuentra el recurso, manejarlo usando errorHandler
    if (
      error instanceof ValidationError ||
      error instanceof ResourceNotFoundError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return errorHandler(error, req, res, next);
    }
  }
};
export const isMine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFrom(req);
    if (!token) {
      throw new ValidationError("Token not can be empty");
    }

    const decodedToken: JwtPayload | string = jwt.verify(
      token,
      SECRET as string
    );

    if (typeof decodedToken === "string") {
      throw new ValidationError("Invalid token");
    }
    const user: UserDTO = await findUser(decodedToken.id_user);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }
    const id = req.params.id;

    if (!id) {
      throw new ValidationError("Id can not empy");
    }

    validateUUID(id);

    if (user.dni !== id) {
      return res.status(401).json({ error: "Unauthorized action" }).send();
    }

    return next();
  } catch (error) {
    // Si es un error de validación o no se encuentra el recurso, manejarlo usando errorHandler
    if (
      error instanceof ValidationError ||
      error instanceof ResourceNotFoundError
    ) {
      return errorHandler(error, req, res, next);
    }
  }
};

export const isMyTurn = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    throw new ValidationError("Token not can be empty");
  }
  const decodedToken: JwtPayload | string = jwt.verify(token, SECRET as string);

  if (typeof decodedToken === "string") {
    throw new ValidationError("Invalid token");
  }

  // const turnToSave: RoutineDTO = req.body.routine;

  // if (decodedToken.id_user !== turnToSave.id_client) {
  //   throw new InvalidOperatioError(
  //     "Invalid operation you need must be a client"
  //   );
  // }

  return next();
};
