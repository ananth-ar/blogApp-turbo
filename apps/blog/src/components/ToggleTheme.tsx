"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToggleTheme({
  handleOnClick,
}: {
  handleOnClick?: (e: any) => void;
}) {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (handleOnClick) handleOnClick(theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-gray-500 dark:text-gray-100"
    >
      <Sun
        className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        onClick={() => setTheme("dark")}
      />
      <Moon
        className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        onClick={() => setTheme("light")}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
