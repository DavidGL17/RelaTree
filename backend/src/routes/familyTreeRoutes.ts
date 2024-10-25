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

familyTreeRouter.get(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`GET request to ${familyTreeRoutePath}/:id`);
    try {
      const user: User = req.user as User;
      const familyTreeId = req.params.id as string;
      const familyTree = await prisma.familyTree.findUnique({
        where: {
          id: familyTreeId,
        },
        include: {
          Person: true,
        },
      });
      if (familyTree?.userId !== user.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }
      res.json(familyTree);
    } catch (error) {
      logger.error("Error getting family tree:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { familyTreeRouter, familyTreeRoutePath };
