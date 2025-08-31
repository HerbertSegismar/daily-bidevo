// src/components/Settings.tsx
import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { FaBell, FaMoon, FaPalette, FaFont, FaClock } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { useBibleVersion } from "../contexts/BibleVersionContext";

const Settings = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : false;
  });

  const [notificationTime, setNotificationTime] = useState(() => {
    const saved = localStorage.getItem("notificationTime");
    return saved || "18:23";
  });

  const { theme, colorScheme, toggleTheme, setColorScheme, colorSchemes } =
    useTheme();
  const { bibleVersion, setBibleVersion } = useBibleVersion();

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return false;
    }

    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return Notification.permission === "granted";
  }, []);

  const showNotification = useCallback(() => {
    if (Notification.permission === "granted") {
      const notification = new Notification("Daily Devotional Reminder", {
        body: "Time for your daily devotional reading!",
        icon: "/icon-192.png",
        tag: "daily-devotional",
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("notificationTime", notificationTime);

    const handleNotifications = async () => {
      if (notifications) {
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) {
          setNotifications(false);
          return;
        }

        const [hours, minutes] = notificationTime.split(":").map(Number);
        const now = new Date();
        const triggerTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes,
          0
        );

        if (now > triggerTime) {
          triggerTime.setDate(triggerTime.getDate() + 1);
        }

        const timeUntilNotification = triggerTime.getTime() - now.getTime();

        setTimeout(() => {
          if (notifications && Notification.permission === "granted") {
            showNotification();
          }
        }, timeUntilNotification);
      }
    };

    handleNotifications();
  }, [
    notifications,
    notificationTime,
    requestNotificationPermission,
    showNotification,
  ]);

  useEffect(() => {
    if (!pageRef.current || !titleRef.current || !cardsRef.current) return;

    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    gsap.fromTo(
      titleRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
    );

    gsap.fromTo(
      cardsRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4 }
    );
  }, []);

  const SettingCard = ({
    children,
    icon: Icon,
    title,
    description,
  }: {
    children: React.ReactNode;
    icon: React.ElementType;
    title: string;
    description: string;
  }) => (
    <div
      className={`backdrop-blur-lg rounded-xl shadow-md p-6 border ${
        theme === "dark"
          ? "bg-gray-700/70 border-gray-600/30"
          : "bg-white/90 border-white/30"
      }`}
    >
      <div className="flex items-center mb-4">
        <Icon
          className={`${
            theme === "dark" ? "text-purple-400" : "text-purple-700"
          } mr-3`}
        />
        <h2
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-purple-200" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      </div>
      <p
        className={`${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        } mb-4`}
      >
        {description}
      </p>
      {children}
    </div>
  );

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: () => void;
    label: string;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );

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
        <h1
          ref={titleRef}
          className="text-3xl font-bold text-purple-900 dark:text-purple-400 mb-8"
        >
          Settings
        </h1>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6">
          <SettingCard
            icon={FaPalette}
            title="Theme Color"
            description="Choose a color scheme that suits your preference"
          >
            <div className="flex space-x-3">
              {colorSchemes.map((scheme) => {
                const colorVariant =
                  theme === "dark" ? scheme.dark : scheme.light;
                return (
                  <button
                    key={scheme.name}
                    onClick={() => setColorScheme(scheme.name)}
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                      colorVariant.from
                    } ${colorVariant.to} ${
                      colorScheme === scheme.name
                        ? "ring-2 ring-offset-2 ring-purple-700 dark:ring-purple-400"
                        : "opacity-70 hover:opacity-100"
                    } transition-all duration-200`}
                    aria-label={`${scheme.name} theme`}
                  ></button>
                );
              })}
            </div>
          </SettingCard>
          <SettingCard
            icon={FaBell}
            title="Notifications"
            description="Receive daily reminders for your devotional time"
          >
            <ToggleSwitch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              label={notifications ? "Enabled" : "Disabled"}
            />
            {notifications && (
              <div className="mt-4 flex items-center">
                <FaClock className="text-purple-700 dark:text-purple-400 mr-3" />
                <label className="text-gray-700 dark:text-gray-300 mr-2">
                  Time:
                </label>
                <input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e.target.value)}
                  className="bg-white dark:bg-gray-600/80 border border-gray-400 dark:border-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-700 focus:border-purple-700 block p-2.5"
                />
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {Notification.permission === "granted"
                ? "Notification permission granted"
                : Notification.permission === "denied"
                ? "Notification permission denied. Please enable in browser settings."
                : "Notification permission will be requested when enabled."}
            </div>
          </SettingCard>

          <SettingCard
            icon={FaMoon}
            title="Dark Mode"
            description="Switch to a darker color scheme for evening reading"
          >
            <ToggleSwitch
              checked={theme === "dark"}
              onChange={toggleTheme}
              label={theme === "dark" ? "Enabled" : "Disabled"}
            />
          </SettingCard>

          <SettingCard
            icon={FaFont}
            title="Bible Version"
            description="Select your preferred Bible translation"
          >
            <select
              value={bibleVersion}
              onChange={(e) => setBibleVersion(e.target.value)}
              className="bg-white dark:bg-gray-600/80 border border-gray-400 dark:border-gray-500 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-purple-700 focus:border-purple-700 block w-full p-2.5"
            >
              <option value="NIV">New International Version (NIV)</option>
              <option value="ESV">English Standard Version (ESV)</option>
              <option value="KJV">King James Version (KJV)</option>
              <option value="NKJV">New King James Version (NKJV)</option>
              <option value="NASB">New American Standard Bible (NASB)</option>
            </select>
          </SettingCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
