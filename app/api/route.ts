import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

async function GET(request: NextRequest) {
  // get all User data from the database
  const users = await prisma.person.findMany();
  return NextResponse.json(users);
}
