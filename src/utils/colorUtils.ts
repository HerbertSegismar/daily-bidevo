// src/utils/colorUtils.ts
export const getColorClasses = (colorScheme: string) => {
  switch (colorScheme) {
    case "green":
      return {
        gradient: "from-green-500 to-teal-400",
        text: "text-green-400",
        lightBg: "bg-green-50",
        lightBorder: "border-green-100",
      };
    case "red":
      return {
        gradient: "from-red-500 to-orange-400",
        text: "text-red-400",
        lightBg: "bg-red-50",
        lightBorder: "border-red-100",
      };
    case "indigo":
      return {
        gradient: "from-indigo-500 to-purple-400",
        text: "text-indigo-400",
        lightBg: "bg-indigo-50",
        lightBorder: "border-indigo-100",
      };
    default: // purple
      return {
        gradient: "from-purple-500 to-blue-400",
        text: "text-purple-400",
        lightBg: "bg-purple-50",
        lightBorder: "border-purple-100",
      };
  }
};
