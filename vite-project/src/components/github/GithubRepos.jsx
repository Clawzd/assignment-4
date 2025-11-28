// src/components/github/GithubRepos.jsx
import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/utils/useTheme";
import LanguageBar from "./LanguageBar";

const GITHUB_USERNAME = "Clawzd";
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

export default function GithubRepos() {
  const { isDark } = useTheme();
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({}); // Store languages for each repo
  const [status, setStatus] = useState("loading"); // loading | error | success

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setStatus("loading");
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        
        const data = await response.json();
        const reposData = Array.isArray(data) ? data : [];
        setRepos(reposData);
        
        // Fetch languages for each repository
        const languagesData = {};
        const languagePromises = reposData.map(async (repo) => {
          try {
            const langResponse = await fetch(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`
            );
            if (langResponse.ok) {
              const langData = await langResponse.json();
              languagesData[repo.id] = langData;
            }
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
          }
        });
        
        await Promise.all(languagePromises);
        setLanguages(languagesData);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        setStatus("error");
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (status === "loading") {
    return (
      <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Loading latest repositories...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`text-center py-12 ${isDark ? "text-red-400" : "text-red-600"}`}>
        Could not load GitHub repositories. Please try again later.
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className={`text-center py-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        No public repositories found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {repos.map((repo, index) => (
        <div
          key={repo.id}
          className={`${index % 2 === 0 ? "slide-in-right" : "slide-in-left"} rounded-2xl p-6 transition-all duration-300 ${
            isDark
              ? "bg-gray-900/50 border border-purple-900/30 hover:border-purple-500/50"
              : "bg-white border border-purple-200/50 hover:border-purple-400/50"
          } glow-purple`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {repo.name}
            </h3>
            {repo.html_url && (
              <Button
                as="a"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-purple text-white"
                size="sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            )}
          </div>

          {repo.description && (
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {repo.description}
            </p>
          )}

          {/* Language breakdown */}
          {languages[repo.id] && <LanguageBar languages={languages[repo.id]} />}

          <div className={`text-sm mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Last updated: {formatDate(repo.updated_at)}
          </div>
        </div>
      ))}
    </div>
  );
}

