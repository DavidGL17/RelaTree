"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemeProvider attribute="class" defaultTheme="system" themes={["dark", "light"]}>
                <SessionProvider>{children}</SessionProvider>
            </NextThemeProvider>
        </NextUIProvider>
    );
}
