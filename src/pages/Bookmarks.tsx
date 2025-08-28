// src/pages/Bookmarks.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Bookmarks = () => {
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

  // Sample bookmarks data
  const bookmarks = [
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
          <FaBookmark className="mr-3 text-red-500" />
          Bookmarked Devotionals
        </h1>

        {bookmarks.length === 0 ? (
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-8 text-center border border-white/30 dark:border-gray-600/30">
            <FaBookmark className="text-4xl text-gray-300 dark:text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Save your favorite devotionals to access them later
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 gap-6">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {bookmark.title}
                  </h2>
                  <div
                    className={`flex items-center text-sm text-gray-500 dark:text-gray-400 ${colorClasses.lightBg}/50 dark:bg-gray-600/50 px-2 py-1 rounded-full`}
                  >
                    {bookmark.date}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Verse: {bookmark.verse}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    className={`bg-gradient-to-r ${colorClasses.gradient} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300`}
                  >
                    Read Devotional
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
