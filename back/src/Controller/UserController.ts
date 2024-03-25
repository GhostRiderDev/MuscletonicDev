import { NextFunction, Request, Response } from "express";
import {
  findUsers,
  findUser,
  addUser,
  removeUser,
  refreshUser,
} from "../Service/UserService";
import { UUID } from "crypto";

export const getUsers = (_req: Request, res: Response, _next: NextFunction) => {
  const usersDB = findUsers();
  res.status(200).send(usersDB);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userDB = findUser(id as UUID);
    res.status(200).send(userDB);
  } catch (err) {
    next(err);
  }
};

export const register = (req: Request, res: Response, _next: NextFunction) => {
  const { user } = req.body;
  const userDB = addUser(user);
  res.status(201).send(userDB);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const userDB = refreshUser(id as UUID, user);
    res.status(200).send(userDB);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    removeUser(id as UUID);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
