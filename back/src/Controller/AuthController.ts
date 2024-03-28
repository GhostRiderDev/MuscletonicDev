import { NextFunction, Request, Response } from "express";
import UserDTO from "../DTO/UserDTO";
import { addCredential } from "../Service/CredentialService";
import {
  addUser,
  generateToken,
  isValidCredentials,
} from "../Service/UserService";
import {
  validateEmail,
  validatePassword,
  validateUser,
} from "../Service/validations";
import { Role } from "../Interface/IUser";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const credentials: string = req.body.credentials;
    validatePassword(credentials);
    const user: UserDTO = req.body.user;
    user.role = Role.USER;
    validateUser(user);
    const id_credential = await addCredential(credentials);

    user.id_credential = id_credential;
    const userDB = await addUser(user);
    res.status(201).send(userDB);
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

    validatePassword(password);
    validateEmail(email);

    const isValid = await isValidCredentials(email, password);

    const data = await generateToken(email);
    if (isValid) {
      res.status(200).json({ ...data });
    } else {
      res.status(401).json({ result: "UnAuthorized" });
    }
  } catch (error) {
    console.log("Paso por aqui...");
    next(error);
  }
};
