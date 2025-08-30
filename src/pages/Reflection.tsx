import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  FaArrowLeft,
  FaSave,
  FaHeart,
  FaBold,
  FaItalic,
  FaUnderline,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useBibleVersion } from "../contexts/BibleVersionContext";
import { getColorClasses } from "../utils/colorUtils";
import type { Devotional, ReflectionPrompt } from "../types";

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Check if content is empty (including HTML tags)
  const isEmpty = value.replace(/<[^>]*>/g, "").trim() === "";

  // Show placeholder when empty and not focused
  useEffect(() => {
    if (editorRef.current) {
      if (isEmpty && !isFocused) {
        editorRef.current.innerHTML = `<span class="placeholder-text">${placeholder}</span>`;
      } else if (editorRef.current.innerHTML.includes("placeholder-text")) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, isFocused, placeholder, isEmpty]);

  const handleFocus = () => {
    setIsFocused(true);
    if (isEmpty && editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    handleContentChange();
  };

  const applyFormatting = (format: string) => {
    document.execCommand(format, false);
    updateButtonStates();
    handleContentChange();
  };

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      // Don't save placeholder text as content
      if (!editorRef.current.innerHTML.includes("placeholder-text")) {
        onChange(editorRef.current.innerHTML);
      } else {
        onChange("");
      }
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <button
          type="button"
          onClick={() => applyFormatting("bold")}
          className={`p-2 rounded mr-1 ${
            isBold
              ? "bg-gray-300 dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Bold"
        >
          <FaBold className="text-sm" />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("italic")}
          className={`p-2 rounded mr-1 ${
            isItalic
              ? "bg-gray-300 dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Italic"
        >
          <FaItalic className="text-sm" />
        </button>
        <button
          type="button"
          onClick={() => applyFormatting("underline")}
          className={`p-2 rounded ${
            isUnderline
              ? "bg-gray-300 dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Underline"
        >
          <FaUnderline className="text-sm" />
        </button>
      </div>

      {/* Editable Content Area */}
      <div className="relative">
        <div
          ref={editorRef}
          className="w-full min-h-32 p-3 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-600/50 focus:outline-none resize-none"
          contentEditable
          onInput={handleContentChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={updateButtonStates}
          onMouseUp={updateButtonStates}
        />
      </div>
    </div>
  );
};

const Reflection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, colorScheme } = useTheme();
  const { bibleVersion } = useBibleVersion();
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

  // Get the verse text for the selected Bible version
  const getVerseText = (verse: Devotional["verse"]) => {
    return verse.text[bibleVersion] || verse.text[verse.defaultVersion];
  };

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
      <style>
        {`
          .placeholder-text {
            color: #9ca3af;
            font-style: italic;
          }
          .dark .placeholder-text {
            color: #6b7280;
          }
        `}
      </style>

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
              "{getVerseText(devotional.verse)}"
            </p>
            <p className={`font-semibold ${colorClasses.text}`}>
              - {devotional.verse.reference} ({bibleVersion})
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
              <RichTextEditor
                value={reflections[prompt.id] || ""}
                onChange={(value) => handleReflectionChange(prompt.id, value)}
                placeholder={prompt.placeholder}
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
