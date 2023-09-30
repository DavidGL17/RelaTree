import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

async function GET(request: NextRequest) {
  const familyTree = await prisma.familyTree.findMany({
    include: {
      Person: true,
    },
  });
  return NextResponse.json(familyTree);
}

export { GET };
