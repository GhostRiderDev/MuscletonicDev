import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFavoriteRoutineUser,
} from "../Controller/UserController";
import { isAdmin, verifyToken } from "../Middleware/token";

const userRouter = express.Router();

userRouter.get("/", isAdmin, getUsers);
userRouter.get("/:id", isAdmin, getUser);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.post("/addFavoriteRoutine/:id", verifyToken, addFavoriteRoutineUser);
userRouter.delete(
  "/removeFavoriteRoutine/:id",
  verifyToken,
  addFavoriteRoutineUser
);
userRouter.get("/getFavoriteRoutines/:id", verifyToken, addFavoriteRoutineUser);

export default userRouter;
