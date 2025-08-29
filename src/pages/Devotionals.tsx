// src/pages/Devotionals.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaCalendar, FaBookOpen } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Devotionals = () => {
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
          text: "text-green-500",
          lightBg: "bg-green-50",
        };
      case "red":
        return {
          gradient: "from-red-500 to-orange-400",
          text: "text-red-500",
          lightBg: "bg-red-50",
        };
      case "indigo":
        return {
          gradient: "from-indigo-500 to-purple-400",
          text: "text-indigo-500",
          lightBg: "bg-indigo-50",
        };
      default: // purple
        return {
          gradient: "from-purple-500 to-blue-400",
          text: "text-purple-500",
          lightBg: "bg-purple-50",
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

  // Sample devotionals data
  const devotionals = [
    {
      id: 1,
      title: "God's Faithfulness",
      date: "Oct 10, 2023",
      verse: "Lamentations 3:22-23",
    },
    {
      id: 2,
      title: "The Peace of God",
      date: "Oct 9, 2023",
      verse: "Philippians 4:6-7",
    },
    {
      id: 3,
      title: "Walking in Love",
      date: "Oct 8, 2023",
      verse: "Ephesians 5:1-2",
    },
    {
      id: 4,
      title: "The Joy of Salvation",
      date: "Oct 7, 2023",
      verse: "Psalm 51:12",
    },
    {
      id: 5,
      title: "Strength in Weakness",
      date: "Oct 6, 2023",
      verse: "2 Corinthians 12:9-10",
    },
    {
      id: 6,
      title: "Trust in the Lord",
      date: "Oct 5, 2023",
      verse: "Proverbs 3:5-6",
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
          className={`text-3xl font-bold ${colorClasses.text} mb-8 flex items-center`}
        >
          <FaBookOpen className={`mr-3 ${colorClasses.text}`} />
          Daily Devotionals
        </h1>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devotionals.map((devotional) => (
            <div
              key={devotional.id}
              className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {devotional.title}
                </h2>
                <div
                  className={`flex items-center text-sm text-slate-200 ${colorClasses.lightBg}/50 dark:bg-gray-500/50 px-2 py-1 rounded-full`}
                >
                  <FaCalendar className={`mr-1 ${colorClasses.text}`} />
                  {devotional.date}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Verse: {devotional.verse}
              </p>
              <button
                className={`bg-gradient-to-r ${colorClasses.gradient} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300`}
              >
                Read Devotional
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devotionals;
