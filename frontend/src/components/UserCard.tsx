import Image from "next/image";

type User =
    | {
          email?: string | null | undefined;
      }
    | undefined;

type Props = {
    user: User;
    pagetype: string;
};

export default function Card({ user, pagetype }: Props) {
    //console.log(user)

    const emailDisplay = user?.email ? (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
            {user?.email}
        </div>
    ) : null;

    return (
        <section className="flex flex-col gap-4">
            {emailDisplay}
            <p className="text-2xl text-white text-center">{pagetype} Page!</p>
        </section>
    );
}
