"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button, ButtonGroup } from "@nextui-org/button";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // TODO use a switch from nextui instead of buttons
    return (
        <div className="flex gap-4">
            <ButtonGroup>
                <Button size="sm" variant={theme === "light" ? "solid" : "faded"} onClick={() => setTheme("light")}>
                    Light
                </Button>
                <Button size="sm" variant={theme === "dark" ? "solid" : "faded"} onClick={() => setTheme("dark")}>
                    Dark
                </Button>
            </ButtonGroup>
        </div>
    );
}
