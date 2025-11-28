// src/components/github/LanguageBar.jsx
import React from "react";
import { useTheme } from "@/utils/useTheme";

// GitHub language colors (approximate)
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#4fc08d",
  React: "#61dafb",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  Other: "#8b5cf6", // Purple fallback
};

export default function LanguageBar({ languages }) {
  const { isDark } = useTheme();

  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  // Calculate total bytes
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  // Calculate percentages and sort by percentage
  const languageData = Object.entries(languages)
    .map(([lang, bytes]) => ({
      name: lang,
      bytes,
      percentage: ((bytes / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.bytes - a.bytes);

  // Get top languages (limit to 5 for display)
  const topLanguages = languageData.slice(0, 5);

  return (
    <div className="mt-4">
      <div className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Languages
      </div>
      
      {/* Language bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-2 bg-gray-700">
        {topLanguages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Other,
            }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>

      {/* Language legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {topLanguages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: LANGUAGE_COLORS[lang.name] || LANGUAGE_COLORS.Other,
              }}
            />
            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
              {lang.name} {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

