import express from "express";

import { authRouter } from "./authRoutes";
import { userRouter } from "./userRoutes";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

export { app };
