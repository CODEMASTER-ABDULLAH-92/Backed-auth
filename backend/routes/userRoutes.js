import express from "express"
import { Loginuser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login",Loginuser);
userRouter.post("/register",registerUser);
export default userRouter;