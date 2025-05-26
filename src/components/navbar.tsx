// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";

const navItems = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/about" },
    { name: "Quiz", href: "/historic" },
    { name: "Perfil", href: "/perfil" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="flex justify-between items-center p-4 shadow-sm border-b bg-white text-black dark:bg-black dark:text-white dark:border-gray-700">
        <div className="text-xl font-bold">ES2</div>
        <ul className="flex gap-4 items-center">
            {navItems.map((item) => (
            <li key={item.href}>
                <Link href={item.href}>
                <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn("text-sm", pathname === item.href && "font-semibold")}
                >
                    {item.name}
                </Button>
                </Link>
            </li>
            ))}
            <li>
            <ThemeToggle />
            </li>
        </ul>
        </nav>
    );
}
