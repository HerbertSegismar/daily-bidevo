// src/pages/Home.tsx
import { useState, useEffect, useRef } from "react";
import {
  FaBook,
  FaPrayingHands,
  FaHeart,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useBibleVersion } from "../contexts/BibleVersionContext";
import { devotionals } from "../data/devotionals";
import { getColorClasses } from "../utils/colorUtils";
import type { Devotional } from "../types";

const Home = () => {
  const navigate = useNavigate();
  const { theme, colorScheme } = useTheme();
  const { bibleVersion } = useBibleVersion(); // Get the selected Bible version
  const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(
    null
  );
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [currentDevotionalIndex, setCurrentDevotionalIndex] =
    useState<number>(0);
  const appRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const verseRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prayerRef = useRef<HTMLDivElement>(null);

  const colorClasses = getColorClasses(colorScheme);

  useEffect(() => {
    setCurrentDevotional(devotionals[currentDevotionalIndex]);

    // Animations
    if (appRef.current) {
      gsap.fromTo(appRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
      );
    }

    const tl = gsap.timeline();
    if (verseRef.current) {
      tl.fromTo(
        verseRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
    }
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
    }
    if (prayerRef.current) {
      tl.fromTo(
        prayerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
    }
  }, [currentDevotionalIndex]);

  const handleBookmark = (): void => {
    setBookmarked(!bookmarked);
    const bookmarkIcon = cardRef.current?.querySelector(".bookmark-icon");
    if (bookmarkIcon) {
      gsap.fromTo(
        bookmarkIcon,
        { scale: 1 },
        { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
      );
    }
  };

  const handleShare = (): void => {
    const shareIcon = cardRef.current?.querySelector(".share-icon");
    if (shareIcon) {
      gsap.fromTo(shareIcon, { rotation: 0 }, { rotation: 360, duration: 0.5 });
    }

    // Check if the Web Share API is available
    if (navigator.share && currentDevotional) {
      // Get the verse text for the current Bible version
      const verseText = currentDevotional.verse.text[bibleVersion];

      navigator
        .share({
          title: currentDevotional.title,
          text: verseText, // Use the version-specific text
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing:", error);
          alert("Devotional shared!");
        });
    } else {
      alert("Devotional shared!");
    }
  };

  const handleNextDevotional = (): void => {
    setCurrentDevotionalIndex((prevIndex) =>
      prevIndex === devotionals.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleReflection = (): void => {
    navigate("/reflection", { state: { devotional: currentDevotional } });
  };

  if (!currentDevotional) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        Loading...
      </div>
    );
  }

  // Get the verse text for the current Bible version
  const verseText = currentDevotional.verse.text[bibleVersion];

  return (
    <div
      ref={appRef}
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 to-purple-50"
      } p-4 md:p-8`}
    >
      {/* Main devotional card with glass effect */}
      <div
        ref={cardRef}
        className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden mb-6 relative border border-white/30 dark:border-gray-600/30"
      >
        {/* Date ribbon */}
        <div
          className={`bg-gradient-to-r ${colorClasses.gradient} text-white py-2 px-4 text-sm font-semibold`}
        >
          {currentDevotional.date}
        </div>

        <div className="p-6">
          {/* Verse section */}
          <div ref={verseRef} className="mb-6">
            <div className="flex items-start mb-2">
              <FaBook className={`${colorClasses.text} mt-1 mr-2`} />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Today's Verse
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic mb-2">
              "{verseText}" {/* Use the version-specific text */}
            </p>
            <p className={`text-right ${colorClasses.text} font-medium`}>
              {currentDevotional.verse.reference} ({bibleVersion}){" "}
              {/* Use the context version */}
            </p>
          </div>

          {/* Devotional content */}
          <div ref={contentRef} className="mb-6">
            <h2 className={`text-xl font-bold ${colorClasses.text} mb-3`}>
              {currentDevotional.title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              {currentDevotional.content
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          {/* Prayer section */}
          <div
            ref={prayerRef}
            className={`${colorClasses.lightBg}/70 dark:bg-gray-600/70 backdrop-blur-sm rounded-lg p-4 mb-6 border ${colorClasses.lightBorder}/30 dark:border-gray-500/30`}
          >
            <div className="flex items-start mb-2">
              <FaPrayingHands className={`${colorClasses.text} mt-1 mr-2`} />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Prayer
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{currentDevotional.prayer}"
            </p>
          </div>

          {/* Reading plan */}
          <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-600/50 pt-4">
            <p>
              Today's Reading:{" "}
              <span className={`font-medium ${colorClasses.text}`}>
                {currentDevotional.readingPlan}
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleBookmark}
            className="p-2 bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-full shadow-md border border-white/30 dark:border-gray-500/30"
            aria-label="Bookmark devotional"
          >
            <FaBookmark
              className={`bookmark-icon ${
                bookmarked
                  ? "text-red-500 fill-current"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-full shadow-md border border-white/30 dark:border-gray-500/30"
            aria-label="Share devotional"
          >
            <FaShare className={`share-icon ${colorClasses.text}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleReflection}
          className="px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 dark:text-gray-200 font-medium flex items-center border border-white/30 dark:border-gray-600/30"
        >
          <FaHeart className="mr-2 text-red-500" /> Reflection
        </button>
        <button
          onClick={handleNextDevotional}
          className={`px-4 py-2 bg-gradient-to-r ${colorClasses.gradient} rounded-full shadow-md text-white font-medium flex items-center`}
        >
          Next Devotional <span className="ml-2">→</span>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow-inner p-1 border border-white/30 dark:border-gray-600/30">
        <div
          className={`bg-gradient-to-r ${colorClasses.gradient} h-2 rounded-full`}
          style={{
            width: `${
              ((currentDevotionalIndex + 1) / devotionals.length) * 100
            }%`,
          }}
        ></div>
      </div>
      <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-2">
        {Math.round(((currentDevotionalIndex + 1) / devotionals.length) * 100)}%
        through devotionals
      </p>
    </div>
  );
};

export default Home;
