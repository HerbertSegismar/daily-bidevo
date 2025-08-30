// src/pages/Bookmarks.tsx
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  FaBookmark,
  FaTrash,
  FaArrowLeft,
  FaTimes,
  FaCalendar,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { useBibleVersion } from "../contexts/BibleVersionContext";
import { getColorClasses } from "../utils/colorUtils";
import { useNavigate } from "react-router-dom";
import type { Devotional } from "../types";

const Bookmarks = () => {
  const navigate = useNavigate();
  const { theme, colorScheme } = useTheme();
  const { bibleVersion } = useBibleVersion();
  const [bookmarks, setBookmarks] = useState<Devotional[]>([]);
  const [selectedDevotional, setSelectedDevotional] =
    useState<Devotional | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const colorClasses = getColorClasses(colorScheme);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setBookmarks(savedBookmarks);

    // Animations
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

  useEffect(() => {
    if (selectedDevotional && modalRef.current) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    }
  }, [selectedDevotional]);

  const openDevotional = (devotional: Devotional) => {
    setSelectedDevotional(devotional);
  };

  const closeDevotional = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => setSelectedDevotional(null),
      });
    } else {
      setSelectedDevotional(null);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Get the verse text for the selected Bible version
  const getVerseText = (verse: Devotional["verse"]) => {
    return verse.text[bibleVersion] || verse.text[verse.defaultVersion];
  };

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
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${colorClasses.text} hover:bg-black/10 dark:hover:bg-white/10 mr-4`}
          >
            <FaArrowLeft />
          </button>
          <h1
            ref={titleRef}
            className={`text-3xl font-bold ${colorClasses.text} flex items-center`}
          >
            <FaBookmark className="mr-3 text-red-500" />
            Bookmarked Devotionals
          </h1>
        </div>

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
                    className={`flex items-center text-sm text-slate-200 ${colorClasses.lightBg}/20 dark:bg-gray-500/50 px-2 py-1 rounded-full`}
                  >
                    {bookmark.date}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Verse: {bookmark.verse.reference}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openDevotional(bookmark)}
                    className={`bg-gradient-to-r ${colorClasses.gradient} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300`}
                  >
                    Read Devotional
                  </button>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    aria-label="Remove bookmark"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for displaying devotional content */}
      {selectedDevotional && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative max-w-2xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col"
          >
            <div className={`p-6 ${colorClasses.lightBg} dark:bg-gray-700`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {selectedDevotional.title}
                </h2>
                <button
                  onClick={closeDevotional}
                  className={`p-2 rounded-full ${colorClasses.text} hover:bg-black/10 dark:hover:bg-white/10`}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex items-center text-sm mb-6">
                <FaCalendar className={`mr-2 ${colorClasses.text}`} />
                <span className={colorClasses.text}>
                  {selectedDevotional.date}
                </span>
              </div>
            </div>

            <div ref={modalContentRef} className="p-6 overflow-y-auto flex-1">
              <div
                className={`p-4 mb-6 rounded-lg ${colorClasses.lightBg}/20 dark:bg-gray-600/30`}
              >
                <p className="italic text-gray-700 dark:text-gray-300 mb-2">
                  "{getVerseText(selectedDevotional.verse)}"
                </p>
                <p className={`font-semibold ${colorClasses.text}`}>
                  - {selectedDevotional.verse.reference} ({bibleVersion})
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
                  {selectedDevotional.content}
                </div>

                <div
                  className={`p-4 rounded-lg ${colorClasses.lightBg}/10 dark:bg-gray-600/20`}
                >
                  <h3 className={`font-semibold mb-2 ${colorClasses.text}`}>
                    Prayer
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    {selectedDevotional.prayer}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Reading Plan:</span>{" "}
                    {selectedDevotional.readingPlan}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
