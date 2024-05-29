import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import getConfig from "next/config";

// a small interface to define the user returned by the api
interface ReturnedUser {
    token: string;
    user: { email: string };
}

interface User {
    email: string;
}

declare module "next-auth" {
    interface Session {
        token?: string;
    }
}

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });
                const user = await res.json();
                console.log(user);
                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    // add a callback to receive the token
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const returnedUser = user as unknown as ReturnedUser;
                token.token = returnedUser.token;
                token.user = returnedUser.user;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.token = token.token as string;
                session.user = token.user as User;
            }
            return session;
        },
    },
};

export { options };
