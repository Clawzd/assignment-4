import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Save, X, Image as ImageIcon, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const ALL_TAGS = ["Cybersecurity", "AI", "Game Dev", "Web", "Mobile", "Blockchain"];

/**
 * ProjectCard
 * - Pure client component
 * - Shows a project in view mode
 * - Switches to edit mode when parent sets isEditing=true
 * - Calls onSave(editData) and onCancel() (parent handles persistence/localStorage)
 */
export default function ProjectCard({
  project,
  index,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isLoading,
  theme,
}) {
  const [editData, setEditData] = useState(project);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setEditData(project);
  }, [project]);

  const toggleTag = (tag) => {
    const currentTags = editData.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setEditData({ ...editData, tags: newTags });
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div
        className={`rounded-xl p-6 transition-all duration-300 ${
          isDark
            ? "bg-gray-900/50 border border-purple-900/30 hover:border-purple-500/50"
            : "bg-white border border-purple-200/50 hover:border-purple-400/50"
        } backdrop-blur-sm glow-purple`}
      >
        {/* Image / Placeholder */}
        <div
          className={`w-full h-48 rounded-lg mb-6 flex items-center justify-center transition-colors ${
            isDark
              ? "bg-black border-2 border-purple-500/30 group-hover:border-purple-400/50"
              : "bg-gray-100 border-2 border-purple-300/30 group-hover:border-purple-400/50"
          }`}
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title || "Project image"}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          ) : (
            <div className="text-center">
              <ImageIcon
                className={`w-12 h-12 mx-auto mb-2 ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                Project Image
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Title */}
            <Input
              value={editData.title || ""}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Project title"
              className={
                isDark
                  ? "bg-black/50 border-purple-500/30 text-white"
                  : "bg-gray-50 border-purple-300 text-gray-900"
              }
            />

            {/* Description */}
            <Textarea
              value={editData.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              placeholder="Project description"
              className={`h-24 ${
                isDark
                  ? "bg-black/50 border-purple-500/30 text-white"
                  : "bg-gray-50 border-purple-300 text-gray-900"
              }`}
            />

            {/* Image URL */}
            <Input
              value={editData.image_url || ""}
              onChange={(e) =>
                setEditData({ ...editData, image_url: e.target.value })
              }
              placeholder="Image URL (optional)  ##############################"
              className={
                isDark
                  ? "bg-black/50 border-purple-500/30 text-white"
                  : "bg-gray-50 border-purple-300 text-gray-900"
              }
            />

            {/* Date */}
            <Input
              type="date"
              value={editData.date || ""}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              className={
                isDark
                  ? "bg-black/50 border-purple-500/30 text-white"
                  : "bg-gray-50 border-purple-300 text-gray-900"
              }
            />

            {/* GitHub URL */}
            <Input
              value={editData.github_url || ""}
              onChange={(e) =>
                setEditData({ ...editData, github_url: e.target.value })
              }
              placeholder="GitHub URL (optional)  ##############################"
              className={
                isDark
                  ? "bg-black/50 border-purple-500/30 text-white"
                  : "bg-gray-50 border-purple-300 text-gray-900"
              }
            />

            {/* Tags */}
            <div className="space-y-2">
              <label
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    variant={(editData.tags || []).includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      (editData.tags || []).includes(tag)
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
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => onSave(editData)}
                className="gradient-purple flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className={
                  isDark ? "border-gray-600 text-gray-300" : "border-gray-400 text-gray-700"
                }
                disabled={isLoading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {project.title || "Untitled Project"}
              </h3>
              <Button
                onClick={onEdit}
                variant="ghost"
                size="icon"
                className={`opacity-0 group-hover:opacity-100 transition-all ${
                  isDark
                    ? "text-gray-400 hover:text-purple-400"
                    : "text-gray-500 hover:text-purple-600"
                }`}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={
                      isDark ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description (expandable) */}
            <AnimatePresence>
              <motion.div initial={false} animate={{ height: expanded ? "auto" : "4.5rem" }} className="overflow-hidden">
                <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {project.description ||
                    "No description yet. Click edit to add details about this project."}
                </p>
              </motion.div>
            </AnimatePresence>

            {project.description && project.description.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={`mt-2 text-sm flex items-center gap-1 transition-colors ${
                  isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                }`}
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {/* GitHub */}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center gap-2 text-sm transition-colors ${
                  isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                }`}
              >
                View on GitHub <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
