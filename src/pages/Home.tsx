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
import type { Devotional } from "../types";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const navigate = useNavigate();
  const { theme, colorScheme } = useTheme();
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

  // Sample devotional data
  const devotionals: Devotional[] = [
    {
      id: "1",
      date: new Date().toDateString(),
      verse: {
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        reference: "Jeremiah 29:11",
        version: "NIV",
      },
      title: "God's Plans for You",
      content: `When life feels uncertain or challenging, it's comforting to remember that God has a plan for each of us. This verse from Jeremiah reminds us that even when we can't see the way forward, God is working behind the scenes for our good.

      His plans are not to harm us but to give us hope and a future. This doesn't mean we won't face difficulties, but rather that in the midst of them, we can trust that God is with us, guiding us toward a purposeful life.

      Today, reflect on areas where you need to trust God's plan more fully. Where might you be trying to control outcomes instead of surrendering to His will?`,
      prayer: `Heavenly Father, thank you for having good plans for my life. Help me to trust you more completely, especially when the path ahead seems unclear. Give me the faith to believe that you are working all things together for my good. Amen.`,
      readingPlan: "Jeremiah 29-30",
    },
    {
      id: "2",
      date: new Date(Date.now() - 86400000).toDateString(),
      verse: {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        reference: "Proverbs 3:5-6",
        version: "NIV",
      },
      title: "Trust in the Lord",
      content: `Trusting God completely is one of the most challenging yet rewarding aspects of our faith journey. It requires letting go of our need to understand everything and instead relying on God's infinite wisdom.

      When we surrender our plans and desires to God, He promises to guide our steps and direct our paths. This doesn't mean life will be without challenges, but that we can have confidence God is leading us in the right direction.

      Consider areas where you're struggling to trust God fully. What would it look like to release those concerns to Him today?`,
      prayer: `Lord, help me to trust You with all my heart and not rely on my own understanding. Guide my steps and make my paths straight as I submit my ways to You. Amen.`,
      readingPlan: "Proverbs 3-4",
    },
    // Add more devotionals as needed
  ];

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
      navigator
        .share({
          title: currentDevotional.title,
          text: currentDevotional.verse.text,
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
              "{currentDevotional.verse.text}"
            </p>
            <p className={`text-right ${colorClasses.text} font-medium`}>
              {currentDevotional.verse.reference} (
              {currentDevotional.verse.version})
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
