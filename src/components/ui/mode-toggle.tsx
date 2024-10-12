import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type theme_options = "theme-light" | "dark" | "system";

const options = [
  ["light", "theme-light"],
  ["dark", "dark"],
  ["system", "system"],
] as [string, theme_options][];

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<theme_options>("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const system =
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || system;

    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="w-4 h-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-mono text-xs lowercase" align="end">
        {options.map(([key, value]) => (
          <DropdownMenuItem
            key={`theme-option-${key}`}
            className="text-xs"
            onClick={() => setThemeState(value)}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
