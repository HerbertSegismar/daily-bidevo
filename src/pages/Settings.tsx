// src/pages/Settings.tsx
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaBell, FaMoon, FaPalette, FaFont } from "react-icons/fa";

const Settings = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [bibleVersion, setBibleVersion] = useState("NIV");

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

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-3xl font-bold text-purple-800 mb-8">
          Settings
        </h1>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6">
          {/* Notifications Setting */}
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30">
            <div className="flex items-center mb-4">
              <FaBell className="text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-purple-800">
                Notifications
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Receive daily reminders for your devotional time
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {notifications ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          {/* Dark Mode Setting */}
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30">
            <div className="flex items-center mb-4">
              <FaMoon className="text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-purple-800">
                Dark Mode
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Switch to a darker color scheme for evening reading
            </p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {darkMode ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          {/* Bible Version Setting */}
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30">
            <div className="flex items-center mb-4">
              <FaFont className="text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-purple-800">
                Bible Version
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Select your preferred Bible translation
            </p>
            <select
              value={bibleVersion}
              onChange={(e) => setBibleVersion(e.target.value)}
              className="bg-white/80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            >
              <option value="NIV">New International Version (NIV)</option>
              <option value="ESV">English Standard Version (ESV)</option>
              <option value="KJV">King James Version (KJV)</option>
              <option value="NKJV">New King James Version (NKJV)</option>
              <option value="NASB">New American Standard Bible (NASB)</option>
            </select>
          </div>

          {/* Theme Color Setting */}
          <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30">
            <div className="flex items-center mb-4">
              <FaPalette className="text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-purple-800">
                Theme Color
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Choose a color scheme that suits your preference
            </p>
            <div className="flex space-x-3">
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-400"></button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-400"></button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-400"></button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
