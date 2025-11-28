// src/pages/Projects.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { defaultProjects as projectsSeed } from "@/data/projectsData";
import { useTheme } from "@/utils/useTheme";

const ALL_TAGS = ["Cybersecurity", "AI", "Game Dev", "Web", "Mobile", "Blockchain"];

export default function Projects() {
  const { theme, isDark } = useTheme();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio_projects") || "null");
    setProjects(Array.isArray(stored) ? stored : projectsSeed);
  }, []);

  // Read category from URL and react when query changes
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "recent";
  const categoryTitle = category === "recent" ? "Recent Projects" : "Coming Soon";

  // filter + sort
  const filteredProjects = useMemo(() => {
    const list = (projects || [])
      .filter((p) => (p.category || "recent") === category)
      .filter((p) => {
        const s = searchQuery.trim().toLowerCase();
        if (!s) return true;
        return (
          (p.title || "").toLowerCase().includes(s) ||
          (p.description || "").toLowerCase().includes(s)
        );
      })
      .filter((p) => {
        if (selectedTags.length === 0) return true;
        return selectedTags.some((t) => (p.tags || []).includes(t));
      })
      .filter((p) => {
        if (selectedLevel === "all") return true;
        return (p.level || "").toLowerCase() === selectedLevel.toLowerCase();
      })
      .slice();

    list.sort((a, b) => {
      const ad = new Date(a.date || a.created_date || 0);
      const bd = new Date(b.date || b.created_date || 0);
      if (sortBy === "date-desc") return bd - ad;
      if (sortBy === "date-asc") return ad - bd;
      if (sortBy === "title-asc") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "title-desc") return (b.title || "").localeCompare(a.title || "");
      return 0;
    });

    return list;
  }, [projects, category, searchQuery, selectedTags, selectedLevel, sortBy]);

  const toggleTag = (tag) =>
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      {!isDark && <div className="absolute inset-0 tech-grid opacity-20" />}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{categoryTitle}</h1>
          <div className="w-24 h-1 gradient-purple mx-auto rounded-full" />
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`mb-8 p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
            isDark ? "bg-gray-900/50 border-purple-900/30" : "bg-white border-purple-200/50"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${
                  isDark ? "bg-black/50 border-purple-500/30 text-white" : "bg-gray-50 border-purple-300 text-gray-900"
                }`}
              />
            </div>

            {/* Level filter */}
            <div>
              <div
                className={`flex items-center justify-between rounded-md px-3 py-2 border ${
                  isDark ? "bg-black/50 border-purple-500/30" : "bg-gray-50 border-purple-300"
                }`}
              >
                <label className={`${isDark ? "text-gray-300" : "text-gray-700"} mr-2`} htmlFor="level">
                  Level
                </label>
                <select
                  id="level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={`outline-none rounded-md px-2 py-1 ${
                    isDark
                        ? "bg-gray-800 text-white border border-purple-600 focus:ring-2 focus:ring-purple-400"
                        : "bg-gray-50 text-gray-900 border border-purple-300 focus:ring-2 focus:ring-purple-300"
                    }`}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Sort by (native select) */}
            <div>
              <div
                className={`flex items-center justify-between rounded-md px-3 py-2 border ${
                  isDark ? "bg-black/50 border-purple-500/30" : "bg-gray-50 border-purple-300"
                }`}
              >
                <label className={`${isDark ? "text-gray-300" : "text-gray-700"} mr-2`} htmlFor="sortby">
                  Sort by
                </label>
                <select
                  id="sortby"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`outline-none rounded-md px-2 py-1 ${
                    isDark
                        ? "bg-gray-800 text-white border border-purple-600 focus:ring-2 focus:ring-purple-400"
                        : "bg-gray-50 text-gray-900 border border-purple-300 focus:ring-2 focus:ring-purple-300"
                    }`}
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title (A–Z)</option>
                  <option value="title-desc">Title (Z–A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`flex items-center gap-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <Filter className="w-4 h-4" />
              Filter by tags:
            </span>
            {ALL_TAGS.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedTags.includes(tag)
                    ? "gradient-purple text-white"
                    : isDark
                    ? "border-purple-500/30 text-gray-300 hover:border-purple-400"
                    : "border-purple-300 text-gray-700 hover:border-purple-500"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || project.title + index}
                project={project}
                index={index}
                isEditing={false}
                onEdit={() => {}}
                onSave={() => {}}
                onCancel={() => {}}
                isLoading={false}
                theme={theme}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}>No projects match your filters.</div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
                setSelectedLevel("all");
                setSortBy("date-desc");
              }}
              className={`px-4 py-2 rounded-md border ${
                isDark ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"
              }`}
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
