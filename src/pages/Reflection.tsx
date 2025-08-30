// src/pages/Reflection.tsx
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaArrowLeft, FaSave, FaHeart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { getColorClasses } from "../utils/colorUtils";
import type { Devotional, ReflectionPrompt } from "../types";

const Reflection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, colorScheme } = useTheme();
  const devotional = location.state?.devotional as Devotional;
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const colorClasses = getColorClasses(colorScheme);

  useEffect(() => {
    if (!devotional) {
      navigate("/");
      return;
    }

    // Load saved reflections from localStorage
    const savedReflections = localStorage.getItem(
      `reflections-${devotional.id}`
    );
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }

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

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4 }
      );
    }
  }, [devotional, navigate]);

  const handleReflectionChange = (promptId: string, value: string) => {
    const updatedReflections = { ...reflections, [promptId]: value };
    setReflections(updatedReflections);

    // Save to localStorage
    localStorage.setItem(
      `reflections-${devotional.id}`,
      JSON.stringify(updatedReflections)
    );
  };

  const handleSave = () => {
    // Show confirmation animation
    const saveButton = document.querySelector(".save-button");
    if (saveButton) {
      gsap.fromTo(
        saveButton,
        { scale: 1 },
        { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 }
      );
    }
  };

  if (!devotional) {
    return null;
  }

  return (
    <div
      ref={pageRef}
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 to-purple-50"
      } p-4 md:p-8`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full ${colorClasses.text} hover:bg-black/10 dark:hover:bg-white/10`}
          >
            <FaArrowLeft />
          </button>
          <h1
            ref={titleRef}
            className={`text-2xl font-bold ${colorClasses.text} flex items-center`}
          >
            <FaHeart className="mr-2 text-red-500" /> Reflection
          </h1>
          <button
            onClick={handleSave}
            className={`save-button p-2 rounded-full ${colorClasses.text} hover:bg-black/10 dark:hover:bg-white/10`}
            aria-label="Save reflections"
          >
            <FaSave />
          </button>
        </div>

        {/* Verse Card */}
        <div
          className={`bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 mb-6 border border-white/30 dark:border-gray-600/30`}
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {devotional.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {devotional.date}
          </p>
          <div
            className={`p-4 mb-4 rounded-lg ${colorClasses.lightBg}/20 dark:bg-gray-600/30`}
          >
            <p className="italic text-gray-700 dark:text-gray-300 mb-2">
              "{devotional.verse.text}"
            </p>
            <p className={`font-semibold ${colorClasses.text}`}>
              - {devotional.verse.reference} ({devotional.verse.version})
            </p>
          </div>
        </div>

        {/* Reflection Prompts */}
        <div ref={contentRef} className="space-y-6">
          {devotional.reflection?.map((prompt: ReflectionPrompt) => (
            <div
              key={prompt.id}
              className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {prompt.question}
              </h3>
              <textarea
                value={reflections[prompt.id] || ""}
                onChange={(e) =>
                  handleReflectionChange(prompt.id, e.target.value)
                }
                placeholder={prompt.placeholder}
                className="w-full h-32 p-3 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-600/50 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}

          {(!devotional.reflection || devotional.reflection.length === 0) && (
            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 dark:border-gray-600/30 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                No reflection prompts available for this devotional.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reflection;
