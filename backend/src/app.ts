import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { app } from "./routes";
import express from "express";
import cors from "cors";
import morgan from "morgan";

// init dotenv
dotenv.config();

const mainApp = express();

// Use the login middleware
mainApp.use(express.json()); // Parse JSON request bodies
mainApp.use(cors()); // Enable CORS
mainApp.use(app);

// Set up Morgan to log HTTP requests
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } }),
);

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

mainApp.listen(3001, "0.0.0.0", () => {
  logger.info("Server is running on port 3001");
});
