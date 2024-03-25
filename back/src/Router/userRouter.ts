import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
} from "../Controller/UserController";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/register", register);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
