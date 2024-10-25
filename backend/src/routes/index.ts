import express from "express";

import { authRouter, authRoutePath } from "./authRoutes";
import { userRouter, userRoutePath } from "./userRoutes";
import { familyTreeRouter, familyTreeRoutePath } from "./familyTreeRoutes";
import { personRoutePath, personRouter } from "./personRoute";

const app = express();

app.use(express.json());

app.use(authRoutePath, authRouter);
app.use(userRoutePath, userRouter);
app.use(familyTreeRoutePath, familyTreeRouter);
app.use(personRoutePath, personRouter);

export { app };
