// src/pages/Settings.tsx
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaBell, FaMoon, FaPalette, FaFont } from "react-icons/fa";
import { useTheme, type ColorScheme } from "../contexts/ThemeContext";
import { useBibleVersion } from "../contexts/BibleVersionContext";

const Settings = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : true;
  });
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();
  const { bibleVersion, setBibleVersion } = useBibleVersion();

  useEffect(() => {
    // Save notifications preference
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

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

  const colorSchemes = [
    {
      name: "purple" as ColorScheme,
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
      name: "green" as ColorScheme,
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
      name: "red" as ColorScheme,
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
      name: "indigo" as ColorScheme,
      light: {
        from: "from-indigo-400",
        to: "to-purple-300",
        bg: "bg-gradient-to-r from-indigo-400 to-purple-300",
      },
      dark: {
        from: "from-indigo-500",
        to: "to-purple-400",
        bg: "bg-gradient-to-r from-indigo-500 to-purple-400",
      },
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
          className="text-3xl font-bold text-purple-900 dark:text-purple-300 mb-8"
        >
          Settings
        </h1>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6">
          {/* Notifications Setting */}
          <div className="bg-white/90 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center mb-4">
              <FaBell className="text-purple-700 dark:text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-purple-200">
                Notifications
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Receive daily reminders for your devotional time
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {notifications ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          {/* Dark Mode Setting */}
          <div className="bg-white/90 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center mb-4">
              <FaMoon className="text-purple-700 dark:text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-purple-200">
                Dark Mode
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Switch to a darker color scheme for evening reading
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {theme === "dark" ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          {/* Bible Version Setting */}
          <div className="bg-white/90 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center mb-4">
              <FaFont className="text-purple-700 dark:text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-purple-200">
                Bible Version
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Select your preferred Bible translation
            </p>
            <select
              value={bibleVersion}
              onChange={(e) => setBibleVersion(e.target.value)}
              className="bg-white dark:bg-gray-600/80 border border-gray-400 dark:border-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5"
            >
              <option value="NIV">New International Version (NIV)</option>
              <option value="ESV">English Standard Version (ESV)</option>
              <option value="KJV">King James Version (KJV)</option>
              <option value="NKJV">New King James Version (NKJV)</option>
              <option value="NASB">New American Standard Bible (NASB)</option>
            </select>
          </div>

          {/* Theme Color Setting */}
          <div className="bg-white/90 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30">
            <div className="flex items-center mb-4">
              <FaPalette className="text-purple-700 dark:text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-purple-200">
                Theme Color
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Choose a color scheme that suits your preference
            </p>
            <div className="flex space-x-3">
              {colorSchemes.map((scheme) => {
                const colorVariant =
                  theme === "dark" ? scheme.dark : scheme.light;
                return (
                  <button
                    key={scheme.name}
                    onClick={() => setColorScheme(scheme.name)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                      colorVariant.from
                    } ${colorVariant.to} ${
                      colorScheme === scheme.name
                        ? "ring-2 ring-offset-2 ring-purple-700 dark:ring-purple-400"
                        : "opacity-70 hover:opacity-100"
                    } transition-all duration-200`}
                    aria-label={`${scheme.name} theme`}
                  ></button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
