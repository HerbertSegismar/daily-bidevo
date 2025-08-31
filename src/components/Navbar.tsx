// src/components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import {
  FaHome,
  FaBook,
  FaBookmark,
  FaCog,
  FaPrayingHands,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaCross,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { getColorClasses } from "../contexts/ThemeContext";
import type { NavItem } from "../types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, colorScheme, toggleTheme } = useTheme();
  const colors = getColorClasses(colorScheme);

  const navItems: NavItem[] = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Devotionals", path: "/devotionals", icon: <FaBook /> },
    { label: "Bookmarks", path: "/bookmarks", icon: <FaBookmark /> },
    { label: "Prayers", path: "/prayers", icon: <FaPrayingHands /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.to(menuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      ref={navbarRef}
      className={`bg-gradient-to-r ${colors.gradient} backdrop-blur-md border-b ${colors.lightBorder}/30 sticky top-0 z-50 shadow-sm`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${colors.gradient} rounded-lg flex items-center justify-center`}
            >
              <FaCross className="text-white text-sm" />
            </div>
            <span className="text-lg md:text-xl font-base md:font-semibold text-white">
              Daily Bible Devotional
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? `${colors.lightBg} ${colors.text}`
                    : "text-blue-50 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${colors.lightBg} ${
                colors.text
              } hover:${colors.lightBg.replace(
                "50",
                "200"
              )} transition-colors duration-300`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className={`md:hidden p-2 rounded-full ${colors.lightBg} ${colors.text} mr-2`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg ${colors.lightBg} ${colors.text}`}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <header className="flex items-center justify-center ml-0 md:ml-2">
              <SignedOut>
                <div
                  className={`${colors.lightBg} ${colors.text} p-2 rounded-lg text-sm font-light hover:scale-110 transition-all duration-100 ease-in-out`}
                >
                  <SignInButton mode="modal" />
                </div>
              </SignedOut>
              <SignedIn>
                <div
                  className={`flex items-center justify-center ${colors.lightBg} p-1 size-[34px] rounded-lg hover:scale-110 transition-all duration-100 ease-in-out`}
                >
                  <UserButton />
                </div>
              </SignedIn>
            </header>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className="md:hidden overflow-hidden h-0 opacity-0 mt-2"
        >
          <div
            className={`py-2 space-y-1 bg-white/80 backdrop-blur-md rounded-lg border ${colors.lightBorder} shadow-sm`}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? `${colors.lightBg} ${colors.text}`
                    : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
