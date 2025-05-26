
"use client";

import { useTheme } from "next-themes";
import { Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button className="flex items-center justify-center" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        <Moon />
    </button>
  );
}
