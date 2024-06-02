import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function Home() {
    const session = await getServerSession(options);

    return (
        <>
            {session ? (
                <h1 className="text-5xl text-green-600 font-semibold text-center">You are Authenticated !!</h1>
            ) : (
                <h1 className="text-5xl text-red-600 font-semibold">You are Not Authenticated !!</h1>
            )}
        </>
    );
}
