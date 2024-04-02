import {
  PrismaClient,
  User,
  FamilyTree,
  Mariage,
  Person,
} from "@prisma/client";

const prisma = new PrismaClient();

export { prisma, User, FamilyTree, Mariage, Person };
