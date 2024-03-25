import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
  login,
} from "../Controller/UserController";
import { isAdmin, verifyToken } from "../Middleware/token";

const userRouter = express.Router();

userRouter.get("/", isAdmin, getUsers);
userRouter.get("/:id", isAdmin, getUser);
userRouter.post("/auth/register", register);
userRouter.post("/auth/login", login);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);

export default userRouter;
