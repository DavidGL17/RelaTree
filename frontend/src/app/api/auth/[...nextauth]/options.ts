import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // const res = await fetch("http://localhost:3001/auth/login", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({
                //         username: credentials?.email,
                //         password: credentials?.password,
                //     }),
                // });
                // const user = await res.json();
                // if (res.ok && user) {
                //     return user;
                // } else {
                //     return null;
                // }

                const user = {
                    id: "001",
                    email: "test",
                    password: "test",
                };
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export { options };
