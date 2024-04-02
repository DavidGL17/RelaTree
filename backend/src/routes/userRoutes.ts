import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma, User } from "../utils/prisma";
import { authenticateToken } from "../middleware/loginMiddleware";
import { logger } from "../utils/logger";
import { removePassword } from "../utils/general";

const userRouter = express.Router();

// Register a new user
userRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    logger.info("POST request to /register");
    try {
      const { email, password } = req.body;

      // Check if the username already exists
      const existingUser: User = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        res.status(400).json({ error: "Username already exists" });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with the hashed password
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // if the user is created successfully, return a success message
      if (user) {
        res.status(201).json({ message: "User registered successfully" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      logger.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// print all users
userRouter.get(
  "/all",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info("GET request to /all");
    try {
      const users = await prisma.user.findMany({
        include: { familyTrees: true },
      });
      res.json(removePassword(users));
    } catch (error) {
      logger.error("Error getting users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// get info about a specific user
userRouter.get(
  "/:email",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info("GET request to /:email");
    try {
      const { email } = req.params;

      // get the user from the db
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // if the user doesn't exist, return an error
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // if the user exists, return the user
      res.json(removePassword([user])[0]);
    } catch (error) {
      logger.error("Error getting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

userRouter.delete(
  "/:username",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info("POST request to /delete");
    try {
      const { email } = req.params;
      // search for user with username
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // delete user
      const deletedUser = await prisma.user.delete({
        where: { email },
      });
      if (deletedUser) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      logger.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { userRouter };
