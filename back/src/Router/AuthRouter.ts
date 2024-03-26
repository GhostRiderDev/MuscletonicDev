import express from "express";
import { login, register } from "../Controller/AuthController";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

export default AuthRouter;
