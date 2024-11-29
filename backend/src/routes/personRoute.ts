import express, { Request, Response } from "express";
import { prisma, User } from "../utils/prisma";
import { authenticateToken } from "../middleware/loginMiddleware";
import { logger } from "../utils/logger";

const personRouter = express.Router();
const personRoutePath: string = "/person";

personRouter.get(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`GET request to ${personRoutePath}/:id`);
    try {
      const user: User = req.user as User;
      const personId = req.params.id as string;
      const person = await prisma.person.findUnique({
        where: {
          id: personId,
        },
        // get the family tree and user associated with the person
        include: {
          familyTree: {
            include: {
              User: true,
            },
          },
        },
      });
      // check if the user is authorized to view the person
      if (person?.familyTree.userId !== user.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }
      res.json(person);
    } catch (error) {
      logger.error("Error getting person:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// create
personRouter.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`POST request to ${personRoutePath}/`);
    try {
      const user: User = req.user as User;
      const familyTreeId = req.body.familyTreeId as string;
      const familyTree = await prisma.familyTree.findUnique({
        where: {
          id: familyTreeId,
        },
        include: {
          User: true,
        },
      });
      if (familyTree?.userId !== user.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }
      const newPerson = await prisma.person.create({
        data: req.body,
      });
      res.json(newPerson);
    } catch (error) {
      logger.error("Error creating person:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

// modify
personRouter.post(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`POST request to ${personRoutePath}/:id`);
    try {
      const user: User = req.user as User;
      const personId = req.params.id as string;
      const person = await prisma.person.findUnique({
        where: {
          id: personId,
        },
        include: {
          familyTree: {
            include: {
              User: true,
            },
          },
        },
      });
      if (person?.familyTree.userId !== user.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }
      const updatedPerson = await prisma.person.update({
        where: {
          id: personId,
        },
        data: req.body,
      });
      res.json(updatedPerson);
    } catch (error) {
      logger.error("Error updating person:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

personRouter.delete(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    logger.info(`DELETE request to ${personRoutePath}/:id`);
    try {
      const user: User = req.user as User;
      const personId = req.params.id as string;
      const person = await prisma.person.findUnique({
        where: {
          id: personId,
        },
        include: {
          familyTree: {
            include: {
              User: true,
            },
          },
        },
      });
      if (person?.familyTree.userId !== user.id) {
        res.status(403).json({ error: "Unauthorized" });
        return;
      }
      const deletedPerson = await prisma.person.delete({
        where: {
          id: personId,
        },
      });
      res.json(deletedPerson);
    } catch (error) {
      logger.error("Error deleting person:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

export { personRouter, personRoutePath };
