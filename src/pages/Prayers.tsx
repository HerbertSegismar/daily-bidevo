// src/pages/Prayers.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaPrayingHands, FaPlus } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Prayers = () => {
  const { theme, colorScheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Get color classes based on selected color scheme
  const getColorClasses = () => {
    switch (colorScheme) {
      case "green":
        return {
          gradient: "from-green-500 to-teal-400",
          text: "text-green-700",
          lightBg: "bg-green-50",
          lightBorder: "border-green-100",
        };
      case "red":
        return {
          gradient: "from-red-500 to-orange-400",
          text: "text-red-700",
          lightBg: "bg-red-50",
          lightBorder: "border-red-100",
        };
      case "indigo":
        return {
          gradient: "from-indigo-500 to-purple-400",
          text: "text-indigo-700",
          lightBg: "bg-indigo-50",
          lightBorder: "border-indigo-100",
        };
      default: // purple
        return {
          gradient: "from-purple-500 to-blue-400",
          text: "text-purple-700",
          lightBg: "bg-purple-50",
          lightBorder: "border-purple-100",
        };
    }
  };

  const colorClasses = getColorClasses();

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4 }
      );
    }
  }, []);

  // Sample prayers data
  const prayers = [
    {
      id: 1,
      title: "Morning Prayer",
      content:
        "Heavenly Father, thank you for this new day. Guide my steps and help me to honor you in all I do.",
    },
    {
      id: 2,
      title: "Evening Prayer",
      content:
        "Lord, thank you for your faithfulness today. Watch over me and my loved ones through the night.",
    },
    {
      id: 3,
      title: "Prayer for Strength",
      content:
        "God, when I am weak, you are strong. Give me the strength I need for today's challenges.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 to-purple-50"
      } p-4 md:p-8`}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className={`text-3xl font-bold ${colorClasses.text} dark:text-purple-300 mb-8 flex items-center`}
        >
          <FaPrayingHands className="mr-3 text-purple-600" />
          Prayer Journal
        </h1>

        <div className="flex justify-end mb-6">
          <button
            className={`bg-gradient-to-r ${colorClasses.gradient} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center`}
          >
            <FaPlus className="mr-2" />
            New Prayer
          </button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {prayer.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "{prayer.content}"
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Added: October 12, 2023
                </span>
                <button
                  className={`${colorClasses.lightBg} dark:bg-gray-600 ${colorClasses.text} dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium`}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prayers;
