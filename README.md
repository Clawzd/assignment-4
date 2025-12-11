# Personal Portfolio — Assignment 4
https://ali-alsarhayd.netlify.app 

A modern developer portfolio built with Vite + React + Tailwind v4, featuring advanced API integrations, state management, and performance optimizations.

## Features

### Core Features
- **Animated space background** (dark mode only) with twinkling stars, nebulas, and shooting stars
- **Dark/light theme system** with localStorage persistence and event-based synchronization
- **Landing page** with personalized greeting, profile section, bio, and navigation buttons
- **Projects page** with advanced filtering (search, tags, level, sort) and category support
- **Contact page** with enhanced form validation and user feedback
- **GitHub page** displaying latest repositories with alternating entrance animations
- **Weather widget** on landing page with OpenWeatherMap API integration

### Advanced Features (Assignment 3)
- **API Integrations:**
  - GitHub API: Fetches and displays latest repositories
  - OpenWeatherMap API: Real-time weather data with city search
- **Advanced State Management:**
  - Theme persistence (localStorage)
  - Weather city preference (localStorage)
  - Visitor name persistence from contact form
- **Complex Filtering Logic:**
  - Combined filters: search, tags, level, and sort on Projects page
- **Performance Optimizations:**
  - Lazy loading images
  - Code cleanup and asset optimization
- **Enhanced UX:**
  - Form validation with inline error messages
  - Disabled submit button when form is invalid
  - Smooth animations and transitions

## Project Structure

```
vite-project/
├─ public/
├─ src/
│ ├─ assets/              # Images (profile + project thumbnails)
│ ├─ components/
│ │ ├─ github/
│ │ │ └─ GithubRepos.jsx  # GitHub API integration component
│ │ ├─ projects/
│ │ │ ├─ ProjectCard.jsx
│ │ │ └─ ProjectForm.jsx
│ │ ├─ ui/                # Reusable UI components
│ │ └─ Weather.jsx        # Weather widget component
│ ├─ data/
│ │ └─ projectsData.js    # Project data with level field
│ ├─ pages/
│ │ ├─ Landing.jsx        # Home page with weather widget
│ │ ├─ Projects.jsx        # Projects with advanced filters
│ │ ├─ Contact.jsx        # Enhanced contact form
│ │ └─ Github.jsx         # GitHub repositories page
│ ├─ utils/
│ │ ├─ index.js
│ │ └─ useTheme.js        # Theme subscription hook
│ ├─ App.jsx              # Router configuration
│ ├─ Layout.jsx           # Navbar + background + theme
│ ├─ index.css            # Tailwind v4 + animations
│ └─ main.jsx             # Entry point
├─ docs/
│ ├─ technical-documentation.md  # Technical documentation
│ └─ ai-usage-report.md           # AI usage report
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ README.md
```

## Getting Started

### Requirements
- Node.js ≥ 18
- npm (or pnpm/yarn)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open the URL printed in the terminal (usually http://localhost:5173).

### Production Build
```bash
npm run build
npm run preview
```

## API Integrations

### GitHub API
- **Endpoint:** `https://api.github.com/users/Clawzd/repos?sort=updated&per_page=6`
- **Location:** `/github` page
- **Features:** Displays latest 6 repositories with alternating entrance animations

### OpenWeatherMap API
- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **Location:** Landing page (Weather widget)
- **Features:** Real-time weather data, city search, localStorage persistence
- **API Key:** Hard-coded in `src/components/Weather.jsx` (for assignment purposes only)

## State Management

- **Theme:** Stored in localStorage under `theme` key (dark/light)
- **Weather City:** Stored in localStorage under `weatherCity` key
- **Visitor Name:** Stored in localStorage under `visitorName` key (from contact form)
- **Messages:** Contact form submissions stored in localStorage under `messages` key

## Customization

### Profile Photo
- File: `src/assets/fovicone1.png`
- Update the path in `src/pages/Landing.jsx` if needed

### Projects Data
- Edit `src/data/projectsData.js`
- Each entry includes: `id`, `title`, `description`, `image_url`, `date`, `github_url`, `tags`, `category`, `level`

### Theme System
- Stored in localStorage under `theme` (dark/light)
- `Layout.jsx` sets `data-theme` on `<body>` and broadcasts `app-theme-change` event
- Components subscribe via `useTheme()` hook in `src/utils/useTheme.js`

## Performance Optimizations

- **Lazy loading:** All images use `loading="lazy"` attribute
- **Code cleanup:** Removed unused assets and dead code
- **Optimized animations:** CSS keyframes for smooth performance

## Accessibility

- Semantic HTML labels
- Focusable controls with keyboard navigation
- High-contrast colors in both themes
- Alt text on all images
- ARIA labels on interactive elements

## Documentation

- **Technical Documentation:** `docs/technical-documentation.md`
- **AI Usage Report:** `docs/ai-usage-report.md`

## AI Tools Used

This project utilized AI tools (ChatGPT, Cursor) for assistance with code generation, API integration patterns, and component structure. All AI-generated code was reviewed, modified, and integrated to match the project's design system and requirements. See `docs/ai-usage-report.md` for detailed information.

## License

MIT
