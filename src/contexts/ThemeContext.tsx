// src/contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ColorScheme = "purple" | "green" | "red" | "indigo";
export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "light";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const savedScheme = localStorage.getItem("colorScheme");
    return (savedScheme as ColorScheme) || "purple";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("colorScheme", colorScheme);

    // Update CSS variables based on color scheme
    const root = document.documentElement;
    switch (colorScheme) {
      case "green":
        root.style.setProperty("--color-primary", "16, 185, 129"); // green-500
        root.style.setProperty("--color-secondary", "45, 212, 191"); // teal-400
        break;
      case "red":
        root.style.setProperty("--color-primary", "139, 68, 68"); // red-500
        root.style.setProperty("--color-secondary", "251, 146, 60"); // orange-400
        break;
      case "indigo":
        root.style.setProperty("--color-primary", "99, 102, 241"); // indigo-500
        root.style.setProperty("--color-secondary", "168, 85, 247"); // purple-400
        break;
      default: // purple
        root.style.setProperty("--color-primary", "139, 92, 246"); // purple-500
        root.style.setProperty("--color-secondary", "96, 165, 250"); // blue-400
        break;
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const updateColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  const value: ThemeContextType = {
    theme,
    colorScheme,
    toggleTheme,
    setColorScheme: updateColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
