import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/loginMiddleware";
import { logger } from "../utils/logger";
import { prisma, User } from "../utils/prisma";

const authRouter = express.Router();

const authRoutePath: string = "/auth";

// Middleware to handle login requests
authRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`POST request to ${authRoutePath}/login`);
    try {
      const { email, password } = req.body;

      // Find the user in the database
      const user: User = await prisma.user.findUnique({
        where: { email },
        include: { familyTrees: true },
      });

      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Compare the provided password with the hashed password stored in the user document
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // If the login is successful, generate a JWT token
      const token = generateToken({ email });

      // strip the user of the password, id, and familyTrees fields
      const userToSend = {
        email: user.email,
      };

      // Send the token as a response with the user information
      res.json({
        token,
        user: userToSend,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { authRouter, authRoutePath };
