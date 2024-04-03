import express, { Request, Response } from "express";
import { prisma, User } from "../utils/prisma";
import { authenticateToken } from "../middleware/loginMiddleware";
import { logger } from "../utils/logger";

const familyTreeRouter = express.Router();
const familyTreeRoutePath: string = "/familyTree";

familyTreeRouter.get(
  "/",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`GET request to ${familyTreeRoutePath}/`);
    try {
      const user: User = req.user as User;
      const familyTrees = await prisma.familyTree.findMany({
        where: {
          userId: user.id,
        },
        include: {
          Person: true,
        },
      });
      res.json(familyTrees);
    } catch (error) {
      logger.error("Error getting family trees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { familyTreeRouter, familyTreeRoutePath };
