// src/contexts/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ColorScheme = "purple" | "green" | "red" | "yellow";
export type Theme = "light" | "dark";

export const colorSchemes = [
  {
    name: "purple" as const,
    light: {
      from: "from-purple-400",
      to: "to-blue-300",
      bg: "bg-gradient-to-r from-purple-400 to-blue-300",
    },
    dark: {
      from: "from-purple-500",
      to: "to-blue-400",
      bg: "bg-gradient-to-r from-purple-500 to-blue-400",
    },
  },
  {
    name: "green" as const,
    light: {
      from: "from-green-400",
      to: "to-teal-300",
      bg: "bg-gradient-to-r from-green-400 to-teal-300",
    },
    dark: {
      from: "from-green-500",
      to: "to-teal-400",
      bg: "bg-gradient-to-r from-green-500 to-teal-400",
    },
  },
  {
    name: "red" as const,
    light: {
      from: "from-red-400",
      to: "to-orange-300",
      bg: "bg-gradient-to-r from-red-400 to-orange-300",
    },
    dark: {
      from: "from-red-500",
      to: "to-orange-400",
      bg: "bg-gradient-to-r from-red-500 to-orange-400",
    },
  },
  {
    name: "yellow" as const,
    light: {
      from: "from-yellow-300",
      to: "to-amber-500",
      bg: "bg-gradient-to-r from-yellow-400 to-amber-300",
    },
    dark: {
      from: "from-yellow-500",
      to: "to-amber-400",
      bg: "bg-gradient-to-r from-yellow-500 to-amber-400",
    },
  },
];

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  colorSchemes: typeof colorSchemes;
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

    const root = document.documentElement;
    switch (colorScheme) {
      case "green":
        root.style.setProperty("--color-primary", "16, 185, 129");
        root.style.setProperty("--color-secondary", "45, 212, 191");
        break;
      case "red":
        root.style.setProperty("--color-primary", "139, 68, 68");
        root.style.setProperty("--color-secondary", "251, 146, 60");
        break;
      case "yellow":
        root.style.setProperty("--color-primary", "234, 179, 8");
        root.style.setProperty("--color-secondary", "251, 191, 36");
        break;
      default:
        root.style.setProperty("--color-primary", "139, 92, 246");
        root.style.setProperty("--color-secondary", "96, 165, 250");
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
    colorSchemes,
    toggleTheme,
    setColorScheme: updateColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const getColorClasses = (colorScheme: string) => {
  switch (colorScheme) {
    case "green":
      return {
        gradient: "from-green-500 to-teal-400",
        text: "text-green-400",
        lightBg: "bg-green-100",
        lightBorder: "border-green-100",
      };
    case "red":
      return {
        gradient: "from-red-500 to-orange-400",
        text: "text-red-400",
        lightBg: "bg-red-100",
        lightBorder: "border-red-100",
      };
    case "yellow":
      return {
        gradient: "from-yellow-300 to-amber-500",
        text: "text-yellow-500",
        lightBg: "bg-yellow-100",
        lightBorder: "border-yellow-100",
      };
    default:
      return {
        gradient: "from-purple-500 to-blue-400",
        text: "text-purple-400",
        lightBg: "bg-purple-100",
        lightBorder: "border-purple-100",
      };
  }
};
