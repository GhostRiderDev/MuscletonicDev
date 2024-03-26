import { NextFunction, Request, Response } from "express";
import {
  findUsers,
  findUser,
  removeUser,
  refreshUser,
  saveFavoriteRoutineUser,
  removeFavoriteRoutineUser,
} from "../Service/UserService";
import { removeCredential } from "../Service/CredentialService";
import { UUID } from "crypto";
import UserDTO from "../DTO/UserDTO";
import { findRoutine } from "../Service/RoutineService";
import { RoutineDTO } from "../DTO/RoutineDTO";
import { validateUUID, validateUser } from "../Service/validations";

export const getUsers = async (
  _req: Request,
  res: Response<{ users: UserDTO[] }>,
  next: NextFunction
) => {
  try {
    const usersDB = await findUsers();
    res.status(200).json({ users: usersDB }).send();
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request<{ id: UUID }>,
  res: Response<{ user: UserDTO }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateUUID(id);
    const userDB = await findUser(id);
    res.status(200).json({ user: userDB }).send();
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateUUID(id);
    const { user } = req.body;
    validateUser(user);
    const userDB = await refreshUser(id as UUID, user);
    res.status(200).send(userDB);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    validateUUID(id);
    const userDB = await findUser(id as UUID);
    removeUser(id as UUID);
    removeCredential(userDB.id_credential as UUID);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
export const addFavoriteRoutineUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_routine } = req.params;
    validateUUID(id_routine);
    const { id_user } = req.body;
    validateUUID(id_user);
    const routineDB: RoutineDTO = await findRoutine(id_routine);
    const user = await saveFavoriteRoutineUser(id_user, routineDB);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const deleteFavoriteRoutineUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_routine } = req.params;
    validateUUID(id_routine);
    const { id_user } = req.body;
    validateUUID(id_user);
    const user = await removeFavoriteRoutineUser(id_user, id_routine as UUID);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getFavoriteRoutinesUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_user } = req.params;
    validateUUID(id_user);
    const user: UserDTO = await findUser(id_user as UUID);
    res.status(200).send(user.routines);
  } catch (err) {
    next(err);
  }
};
