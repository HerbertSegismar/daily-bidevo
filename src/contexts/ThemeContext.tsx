// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark";
export type ColorScheme = "purple" | "green" | "red" | "indigo";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem("colorScheme");
    return (saved as ColorScheme) || "purple";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("colorScheme", colorScheme);

    // Update document class for dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update document class for color scheme
    document.documentElement.classList.remove(
      "theme-purple",
      "theme-green",
      "theme-red",
      "theme-indigo"
    );
    document.documentElement.classList.add(`theme-${colorScheme}`);
  }, [theme, colorScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colorScheme, toggleTheme, setColorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
