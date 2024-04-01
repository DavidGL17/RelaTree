import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

const seedData = JSON.parse(fs.readFileSync("prisma/seedData.json", "utf8"));

const seed = async () => {
  try {
    const { familyTrees } = seedData;

    for (const familyTreeData of familyTrees) {
      const { persons, mariages, ...familyTree } = familyTreeData;

      // Create FamilyTree
      const createdFamilyTree = await prisma.familyTree.create({
        data: familyTree,
      });

      // Create Persons
      for (const personData of persons) {
        await prisma.person.create({
          data: {
            ...personData,
            familyTreeId: createdFamilyTree.id,
          },
        });
      }

      // Create Mariages
      for (const mariageData of mariages) {
        await prisma.mariage.create({
          data: {
            ...mariageData,
          },
        });
      }
    }

    console.log("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding test data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
