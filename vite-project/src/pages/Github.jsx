// src/pages/Github.jsx
import React from "react";
import { motion } from "framer-motion";
import GithubRepos from "@/components/github/GithubRepos";
import { useTheme } from "@/utils/useTheme";

export default function Github() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      {!isDark && <div className="absolute inset-0 tech-grid opacity-20" />}

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Latest GitHub Repositories
          </h1>
          <div className="w-24 h-1 gradient-purple mx-auto rounded-full" />
        </motion.div>

        {/* Repositories */}
        <GithubRepos />
      </div>
    </div>
  );
}

