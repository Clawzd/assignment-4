// src/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Weather from "@/components/Weather";

export default function Landing() {
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    // Check for visitor name from contact form first, then portfolioUserName
    const visitorName = localStorage.getItem("visitorName");
    const savedName = localStorage.getItem("portfolioUserName");
    if (visitorName) {
      setUserName(visitorName);
    } else if (savedName) {
      setUserName(savedName);
    }

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    
    // Listen for visitor name updates
    const handleVisitorNameUpdate = (e) => {
      const newName = e?.detail || localStorage.getItem("visitorName");
      if (newName) {
        setUserName(newName);
      }
    };
    
    const handleStorageChange = () => {
      const newVisitorName = localStorage.getItem("visitorName");
      if (newVisitorName) {
        setUserName(newVisitorName);
      }
    };
    
    // Listen for custom event (same-tab updates)
    window.addEventListener("visitorNameUpdated", handleVisitorNameUpdate);
    // Listen for storage event (cross-tab updates)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visitorNameUpdated", handleVisitorNameUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSaveName = () => {
    if (userName.trim()) {
      localStorage.setItem("portfolioUserName", userName.trim());
      setShowNameInput(false);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {userName ? `Welcome back, ${userName}!` : `${greeting}!`}
            </p>
          </div>

          {!userName && !showNameInput && (
            <button
              onClick={() => setShowNameInput(true)}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              Click to personalize your experience
            </button>
          )}

          {showNameInput && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-2 justify-center mt-4 max-w-xs mx-auto"
            >
              <Input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                className={`${
                  isDark
                    ? "bg-gray-900/50 border-purple-500/30 text-white"
                    : "bg-white border-purple-300 text-gray-900"
                }`}
                autoFocus
              />
              <Button onClick={handleSaveName} className="gradient-purple">
                Save
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Profile circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className={`w-64 h-64 mx-auto mb-12 rounded-full flex items-center justify-center glow-purple relative group cursor-pointer transition-all duration-300 ${
            isDark
              ? "bg-black border-4 border-purple-500 hover:border-purple-400"
              : "bg-white border-4 border-purple-600 hover:border-purple-500"
          }`}
        >
          <img
            src="src/assets/fovicone1.png"
            alt="Profile"
            className="w-56 h-56 rounded-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 border-2 border-transparent border-t-purple-400 rounded-full animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </motion.div>

        {/* About me (centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className={`relative p-8 border-2 rounded-lg glow-purple flex items-center justify-center text-center ${
              isDark ? "border-purple-500 bg-black/50" : "border-purple-400 bg-white/80"
            }`}
          >
            <p className={`text-lg leading-relaxed font-light ${isDark ? "text-white" : "text-gray-800"}`}>
              I'm <span className="text-purple-400 font-semibold">Ali</span>, a CS student at KFUPM. I care about{" "}
              <span className="text-purple-300">Software Design</span> and how parts fit together,{" "}
              <span className="text-purple-300">simple UI/UX</span>, and{" "}
              <span className="text-purple-300">data that makes sense</span>.
              <br />
              I'm also into <span className="text-purple-300">Cybersecurity</span>,{" "}
              <span className="text-purple-300">AI</span>, and{" "}
              <span className="text-purple-300">Game Development</span>.
              <br />
              My goal is to build apps that feel fast, are easy to understand, and stay reliable as they grow.
            </p>
          </div>
        </motion.div>

        {/* Navigation circles */}
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex justify-center items-center gap-16 mt-20"
        >
        <Link to="/projects?category=recent" className="group flex flex-col items-center">
            <p
            className={`text-lg font-medium mb-4 ${
                isDark
                ? "text-white group-hover:text-purple-400"
                : "text-gray-900 group-hover:text-purple-600"
            }`}
            >
            Recent Projects
            </p>
            <div className="relative">
            <div className="w-32 h-32 gradient-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-purple">
                <Code className="w-12 h-12 text-white" />
            </div>
            </div>
        </Link>

        <Link to="/projects?category=upcoming" className="group flex flex-col items-center">
            <p
            className={`text-lg font-medium mb-4 ${
                isDark
                ? "text-white group-hover:text-purple-400"
                : "text-gray-900 group-hover:text-purple-600"
            }`}
            >
            Coming Soon
            </p>
            <div className="relative">
            <div className="w-32 h-32 gradient-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-purple">
                <Zap className="w-12 h-12 text-white" />
            </div>
            </div>
        </Link>
        </motion.div>

        {/* Weather Section */}
        <Weather />

        {/* Animated decorative bars */}
        <div className="flex justify-center mt-20 space-x-4">
          <motion.div
            initial={{ y: 0, opacity: 0.6 }}
            animate={{ y: [-6, 6, -6], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0 }}
            className="w-1 h-8 bg-purple-500 rounded-sm"
          />
          <motion.div
            initial={{ y: 0, opacity: 0.8 }}
            animate={{ y: [-10, 10, -10], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.15 }}
            className="w-1 h-6 bg-purple-400 rounded-sm mt-1"
          />
          <motion.div
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 0.3 }}
            className="w-1 h-10 bg-purple-600 rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
