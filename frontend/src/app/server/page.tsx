import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "@/components/UserCard";
import { redirect } from "next/navigation";

export default async function ServerPage() {
    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server");
    }

    // get the jwt token from the session
    const token = session?.token;

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
            <div className="text-white text-center">{token}</div>
        </section>
    );
}
