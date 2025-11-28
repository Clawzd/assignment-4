// src/App/Layout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
    document.body.style.background = theme === "dark" ? "#000000" : "#f9fafb";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#111827";
    window.dispatchEvent(new CustomEvent("app-theme-change", { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <style>
        {`
          :root {
            --primary-purple: #8b5cf6;
            --accent-purple: #a855f7;
            --dark-purple: #6d28d9;
            --text-purple: #c4b5fd;
          }
          .gradient-purple { background: linear-gradient(135deg, var(--primary-purple), var(--accent-purple)); }
          .glow-purple { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          .tech-grid { background-image: radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 0); background-size: 20px 20px; }

          @keyframes twinkle { 0%,100% {opacity:.3} 50% {opacity:1} }
          @keyframes shooting-star { 0% { transform: translateX(0) translateY(0); opacity: 1; } 100% { transform: translateX(-200px) translateY(200px); opacity: 0; } }
          @keyframes nebula-float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(50px,50px) scale(1.1); } }

          .space-background { position: fixed; inset: 0; background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%); overflow: hidden; z-index: 0; }
          .stars { position:absolute; inset:0; }
          .star { position:absolute; background:white; border-radius:50%; animation: twinkle linear infinite; }
          .shooting-star { position:absolute; width:2px; height:2px; background:white; box-shadow: 0 0 10px 2px rgba(255,255,255,.8); animation: shooting-star 3s linear infinite; }

          .nebula { position:absolute; border-radius:50%; filter:blur(60px); opacity:.3; animation: nebula-float 20s ease-in-out infinite; }
          .nebula-1 { width:300px; height:300px; top:10%; left:20%; background: radial-gradient(circle, rgba(139,92,246,.4), transparent); animation-duration:25s; }
          .nebula-2 { width:400px; height:400px; top:60%; right:10%; background: radial-gradient(circle, rgba(168,85,247,.3), transparent); animation-duration:30s; animation-delay:-10s; }
          .nebula-3 { width:250px; height:250px; bottom:20%; left:50%; background: radial-gradient(circle, rgba(109,40,217,.35), transparent); animation-duration:22s; animation-delay:-5s; }
        `}
      </style>

      {isDark && (
        <div className="space-background" key={theme}>
          <div className="nebula nebula-1"></div>
          <div className="nebula nebula-2"></div>
          <div className="nebula nebula-3"></div>

          <div className="stars">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark ? "bg-black/60" : "bg-white/80"
        } backdrop-blur-md border-b ${isDark ? "border-purple-900/20" : "border-purple-200/50"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className={`text-xl font-bold ${
              isDark ? "text-white hover:text-purple-400" : "text-gray-900 hover:text-purple-600"
            }`}
          >
            Ali Alsarhayd
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? isDark
                    ? "text-purple-400"
                    : "text-purple-600"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`transition-colors ${
                location.pathname === "/projects"
                  ? isDark
                    ? "text-purple-400"
                    : "text-purple-600"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                location.pathname === "/contact"
                  ? isDark
                    ? "text-purple-400"
                    : "text-purple-600"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/github"
              className={`transition-colors ${
                location.pathname === "/github"
                  ? isDark
                    ? "text-purple-400"
                    : "text-purple-600"
                  : isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              GitHub
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`transition-all duration-300 ${
                isDark ? "hover:bg-purple-900/20" : "hover:bg-purple-100"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400 hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-purple-600 hover:-rotate-12 transition-transform duration-500" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-20">{children}</main>
    </div>
  );
}
