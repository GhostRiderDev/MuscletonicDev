import express from "express";
import { login, register, validateToken } from "../Controller/AuthController";
import { verifyToken } from "../Middleware/token";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/valid/token", verifyToken, validateToken);

export default AuthRouter;
