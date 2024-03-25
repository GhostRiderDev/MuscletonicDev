import { NextFunction, Request, Response } from "express";
import {
  findUsers,
  findUser,
  addUser,
  removeUser,
  refreshUser,
  isValidCredentials,
  generateToken,
} from "../Service/UserService";
import { addCredential, removeCredential } from "../Service/CredentialService";
import { UUID } from "crypto";
import UserDTO from "../DTO/UserDTO";

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
    const userDB = await findUser(id);
    res.status(200).json({ user: userDB }).send();
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserDTO = req.body.user;
    const credentials: string = req.body.credentials;
    const id_credential = await addCredential(credentials);

    user.id_credential = id_credential;
    const userDB = await addUser(user);
    res.status(201).send(userDB);
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
    const { user } = req.body;
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
    const userDB = await findUser(id as UUID);
    removeUser(id as UUID);
    removeCredential(userDB.id_credential as UUID);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const isValid = await isValidCredentials(email, password);
    const data = await generateToken(email);
    if (isValid) {
      res
        .status(200)
        .json({ ...data })
        .send();
    } else {
      res.status(204).json({ result: "UnAuthorized" }).send();
    }
  } catch (error) {
    next(error);
  }
};
