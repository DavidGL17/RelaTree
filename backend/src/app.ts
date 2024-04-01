import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import express from "express";

// init dotenv
dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// async function main() {
//   const newFamilyTree = await prisma.familyTree.create({
//     data: {
//       name: "My Family Tree",
//     },
//   });
//   logger.info(`Created family tree with id: ${newFamilyTree.id}`);

//   const allFamilyTrees = await prisma.familyTree.findMany();
//   logger.info(allFamilyTrees);
// }

app.get("/", async (req, res) => {
  const allFamilyTrees = await prisma.familyTree.findMany();
  res.json(allFamilyTrees);
});

app.listen(3000, () => {
  logger.info("Server is running on http://localhost:3000");
});
