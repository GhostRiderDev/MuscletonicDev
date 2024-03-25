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
  _next: NextFunction
) => {
  const usersDB = await findUsers();
  res.status(200).json({ users: usersDB }).send();
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
  _next: NextFunction
) => {
  const user: UserDTO = req.body.user;
  const credentials: string = req.body.credentials;
  const id_credential = await addCredential(credentials);
  console.log(id_credential);

  user.id_credential = id_credential;
  const userDB = await addUser(user);
  res.status(201).send(userDB);
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
    const { username, password } = req.body;
    const isValid = await isValidCredentials(username, password);
    const data = await generateToken(username);
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
