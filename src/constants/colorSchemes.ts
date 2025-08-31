// src/constants/colorSchemes.ts
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
      from: "from-yellow-400",
      to: "to-amber-300",
      bg: "bg-gradient-to-r from-yellow-400 to-amber-300",
    },
    dark: {
      from: "from-yellow-500",
      to: "to-amber-400",
      bg: "bg-gradient-to-r from-yellow-500 to-amber-400",
    },
  },
];
