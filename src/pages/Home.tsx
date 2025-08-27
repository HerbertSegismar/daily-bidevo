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

const Home = () => {
  const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(
    null
  );
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const appRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const verseRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prayerRef = useRef<HTMLDivElement>(null);

  // Sample devotional data
  const sampleDevotional: Devotional = {
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
  };

  useEffect(() => {
    setCurrentDevotional(sampleDevotional);

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
  }, []);

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
    alert("Devotional shared!");
  };

  if (!currentDevotional) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8"
    >
      {/* Main devotional card with glass effect */}
      <div
        ref={cardRef}
        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden mb-6 relative border border-white/30"
      >
        {/* Date ribbon */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 text-sm font-semibold">
          {currentDevotional.date}
        </div>

        <div className="p-6">
          {/* Verse section */}
          <div ref={verseRef} className="mb-6">
            <div className="flex items-start mb-2">
              <FaBook className="text-purple-500 mt-1 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">
                Today's Verse
              </h2>
            </div>
            <p className="text-gray-700 italic mb-2">
              "{currentDevotional.verse.text}"
            </p>
            <p className="text-right text-purple-600 font-medium">
              {currentDevotional.verse.reference} (
              {currentDevotional.verse.version})
            </p>
          </div>

          {/* Devotional content */}
          <div ref={contentRef} className="mb-6">
            <h2 className="text-xl font-bold text-purple-800 mb-3">
              {currentDevotional.title}
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
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
            className="bg-purple-50/70 backdrop-blur-sm rounded-lg p-4 mb-6 border border-purple-100/30"
          >
            <div className="flex items-start mb-2">
              <FaPrayingHands className="text-purple-500 mt-1 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Prayer</h3>
            </div>
            <p className="text-gray-700 italic">"{currentDevotional.prayer}"</p>
          </div>

          {/* Reading plan */}
          <div className="text-sm text-gray-600 border-t border-gray-200/50 pt-4">
            <p>
              Today's Reading:{" "}
              <span className="font-medium text-purple-700">
                {currentDevotional.readingPlan}
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleBookmark}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white/30"
            aria-label="Bookmark devotional"
          >
            <FaBookmark
              className={`bookmark-icon ${
                bookmarked ? "text-red-500 fill-current" : "text-gray-400"
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-white/30"
            aria-label="Share devotional"
          >
            <FaShare className="share-icon text-purple-500" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-purple-700 font-medium flex items-center border border-white/30">
          <FaHeart className="mr-2 text-red-500" /> Reflection
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full shadow-md text-white font-medium flex items-center">
          Next Devotional <span className="ml-2">→</span>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-full shadow-inner p-1 border border-white/30">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-400 h-2 rounded-full"
          style={{ width: "75%" }}
        ></div>
      </div>
      <p className="text-center text-xs text-gray-600 mt-2">
        75% through yearly plan
      </p>
    </div>
  );
};

export default Home;
