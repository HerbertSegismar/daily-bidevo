// src/pages/Prayers.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaPrayingHands, FaPlus } from "react-icons/fa";

const Prayers = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  // Sample prayers data
  const prayers = [
    {
      id: 1,
      title: "Morning Prayer",
      content:
        "Heavenly Father, thank you for this new day. Guide my steps and help me to honor you in all I do.",
    },
    {
      id: 2,
      title: "Evening Prayer",
      content:
        "Lord, thank you for your faithfulness today. Watch over me and my loved ones through the night.",
    },
    {
      id: 3,
      title: "Prayer for Strength",
      content:
        "God, when I am weak, you are strong. Give me the strength I need for today's challenges.",
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-3xl font-bold text-purple-800 mb-8 flex items-center"
        >
          <FaPrayingHands className="mr-3 text-purple-600" />
          Prayer Journal
        </h1>

        <div className="flex justify-end mb-6">
          <button className="bg-gradient-to-r from-purple-500 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-600 hover:to-blue-500 transition-all duration-300 flex items-center">
            <FaPlus className="mr-2" />
            New Prayer
          </button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-6 border border-white/30 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-3">
                {prayer.title}
              </h2>
              <p className="text-gray-600 mb-4 italic">"{prayer.content}"</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Added: October 12, 2023
                </span>
                <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prayers;
