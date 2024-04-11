import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "@/components/UserCard";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col text-center gap-6">
      <h1 className="text-5xl  font-semibold">RelaTree</h1>
      <p className="text-lg">A family tree for the modern age.</p>
    </div>
  );
}
