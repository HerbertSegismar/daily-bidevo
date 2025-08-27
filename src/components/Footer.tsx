// src/components/Footer.tsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-white/80 backdrop-blur-md border-t border-purple-200/30 mt-12 py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-purple-800">Daily Bread</h3>
            <p className="text-sm text-gray-600">
              Nourishing your spirit daily
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">
              Made with <FaHeart className="inline text-red-500" /> for
              believers everywhere
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            <span className="text-amber-400">&copy;</span> {new Date().getFullYear()} Daily Bread
            Devotional App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
