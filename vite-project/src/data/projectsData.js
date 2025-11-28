// src/data/projectsData.js


import flyingImg from "@/assets/image.png";
import treasureImg from "@/assets/TREASURE-QUEST.png";
import kfupmImg from "@/assets/KFUPM.png";
import sqlImg from "@/assets/sql.png";

export const defaultProjects = [
  {
    id: 1,
    title: "Flying Stars",
    description:
      "Reaction-time game where a fast star moves and you must hit the correct edge. Focus on timing, input, and clear feedback.",
    image_url: flyingImg,
    date: "2024-03-10",
    github_url: "https://github.com/Clawzd/FlyingStars",
    tags: ["Game Dev"],
    category: "recent",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Treasure Quest",
    description:
      "Maze shortest-path solver: user provides a maze; the program finds the optimal route to the treasure.",
    image_url: treasureImg,
    date: "2024-08-22",
    github_url: "https://github.com/Clawzd/TREASURE-QUEST",
    tags: ["Game Dev"],
    category: "recent",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "KFUPM Restaurant System",
    description:
      "Campus ordering system with menus, cart, and simple order tracking for university restaurants.",
    image_url: kfupmImg,
    date: "2025-08-30",
    github_url: "",
    tags: ["Web"],
    category: "upcoming",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Football SQL",
    description:
      "Relational database for football stats with analytical queries for matches, players, and leaderboards.",
    image_url: sqlImg,
    date: "2025-09-15",
    github_url: "https://github.com/Clawzd/sqlProject",
    tags: ["Web", "Mobile"],
    category: "upcoming",
    level: "Intermediate",
  },
];
