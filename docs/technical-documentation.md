# Technical Documentation — Assignment 3

## Overview

This portfolio is a modern React application built with Vite, React 19, and Tailwind CSS v4. Assignment 3 extends the base portfolio (Assignment 2) with advanced features including API integrations, complex state management, enhanced filtering logic, and performance optimizations.

**Purpose:** Demonstrate proficiency in React development, API integration, state management, and performance optimization techniques.

---

## Project Structure

```
vite-project/
├─ public/                    # Static assets
├─ src/
│ ├─ assets/                  # Images (profile, project thumbnails)
│ ├─ components/
│ │ ├─ github/
│ │ │ └─ GithubRepos.jsx      # GitHub API integration component
│ │ ├─ projects/
│ │ │ ├─ ProjectCard.jsx     # Project display card
│ │ │ └─ ProjectForm.jsx      # Project form (unused in current version)
│ │ ├─ ui/                    # Reusable UI primitives
│ │ │ ├─ button.jsx
│ │ │ ├─ input.jsx
│ │ │ ├─ textarea.jsx
│ │ │ ├─ badge.jsx
│ │ │ ├─ select.jsx
│ │ │ └─ alert.jsx
│ │ └─ Weather.jsx             # Weather widget component
│ ├─ data/
│ │ └─ projectsData.js         # Project data source with level field
│ ├─ pages/
│ │ ├─ Landing.jsx             # Home page with weather widget
│ │ ├─ Projects.jsx            # Projects with advanced filters
│ │ ├─ Contact.jsx             # Enhanced contact form
│ │ └─ Github.jsx              # GitHub repositories page
│ ├─ utils/
│ │ ├─ index.js                # Utility functions
│ │ └─ useTheme.js             # Theme subscription hook
│ ├─ App.jsx                   # Router configuration
│ ├─ Layout.jsx                # Navbar + background + theme
│ ├─ index.css                 # Tailwind v4 + global styles + animations
│ └─ main.jsx                  # Application entry point
├─ docs/
│ ├─ technical-documentation.md
│ └─ ai-usage-report.md
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ package.json
```

---

## API Integrations

### GitHub API

**Endpoint:**
```
https://api.github.com/users/Clawzd/repos?sort=updated&per_page=6
```

**Implementation:**
- **Location:** `src/components/github/GithubRepos.jsx`
- **Method:** GET request using native `fetch` API
- **Data Fetched:**
  - Repository name
  - Description
  - Last updated date
  - HTML URL (for external link)
- **Display:**
  - Rendered on `/github` page
  - Shows latest 6 repositories sorted by update date
  - Each repository displayed in a card with alternating entrance animations
- **Error Handling:**
  - Loading state: "Loading latest repositories..."
  - Error state: "Could not load GitHub repositories. Please try again later."
  - Empty state: "No public repositories found."
- **Animations:**
  - Cards alternate sliding in from left and right
  - Implemented using CSS keyframes (slideInLeftSmooth, slideInRightSmooth)
  - Applied based on array index (index % 2)

### OpenWeatherMap API

**Endpoint:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}
```

**Implementation:**
- **Location:** `src/components/Weather.jsx`
- **API Key:** Hard-coded in component (for assignment purposes only)
  ```javascript
  const API_KEY = "681ffdbe5041173a8d915a327f1267c3";
  ```
- **Method:** GET request using native `fetch` API
- **Data Fetched:**
  - City name and country
  - Temperature in Celsius
  - Weather description
  - Humidity percentage
- **Display:**
  - Rendered on Landing page below navigation buttons
  - Shows current weather for user-selected city
  - Includes input field for city search
- **State Management:**
  - Default city: "Dhahran"
  - Last selected city saved in localStorage under key "weatherCity"
  - On mount, loads saved city or uses default
- **Error Handling:**
  - Loading state: "Loading weather data..."
  - Error state: "Could not load weather data. Please check the city name or try again later."
- **Animation:**
  - Fade-in and slide-up animation on scroll into view
  - Implemented using IntersectionObserver API
  - Smooth transition matching portfolio aesthetic

---

## State Management

### Theme System

**Storage:** localStorage key `"theme"` (values: `"dark"` | `"light"`)

**Implementation:**
- **Location:** `src/Layout.jsx`
- **Mechanism:** Event-based synchronization
  - Layout component manages theme state
  - Sets `data-theme` attribute on `<body>` element
  - Dispatches `app-theme-change` custom event
- **Subscription:**
  - Components subscribe via `useTheme()` hook (`src/utils/useTheme.js`)
  - Hook listens for `app-theme-change` events
  - Returns `{ theme, isDark }` for component use
- **Persistence:** Theme preference saved to localStorage on change

### Weather City Preference

**Storage:** localStorage key `"weatherCity"`

**Implementation:**
- Saved when user searches for a new city
- Loaded on Weather component mount
- Falls back to default "Dhahran" if no saved city exists

### Visitor Name

**Storage:** localStorage key `"visitorName"`

**Implementation:**
- Saved when user submits contact form with name
- Used on Landing page for personalized greeting
- Landing page checks for `"visitorName"` first, then falls back to `"portfolioUserName"`
- Real-time updates via event listeners (storage and focus events)
- Greeting changes from generic time-based to "Welcome back, {name}!" when name exists

### Contact Messages

**Storage:** localStorage key `"messages"` (array of message objects)

**Implementation:**
- Messages stored as JSON array
- Each message includes: name, email, message, createdAt timestamp
- Persists across page reloads

---

## Complex Logic

### Projects Page Filtering

**Location:** `src/pages/Projects.jsx`

**Filter Criteria:**
1. **Category Filter:** URL query parameter (`?category=recent` or `?category=upcoming`)
2. **Search Filter:** Text search in title and description (case-insensitive)
3. **Tag Filter:** Multiple tag selection (Cybersecurity, AI, Game Dev, Web, Mobile, Blockchain)
4. **Level Filter:** Single selection (All Levels, Beginner, Intermediate, Advanced)
5. **Sort Option:** Date (asc/desc) or Title (A-Z/Z-A)

**Implementation:**
- All filters combined in a single `useMemo` hook
- Filters applied sequentially:
  ```javascript
  .filter((p) => category match)
  .filter((p) => search text match)
  .filter((p) => tag match)
  .filter((p) => level match)
  .sort((a, b) => sort logic)
  ```
- All filters work together simultaneously
- "Clear Filters" button resets all filter states

**Performance:**
- `useMemo` prevents unnecessary recalculations
- Only recalculates when dependencies change (projects, category, searchQuery, selectedTags, selectedLevel, sortBy)

---

## Performance Optimizations

### Lazy Loading Images

**Implementation:**
- Added `loading="lazy"` attribute to all `<img>` tags
- **Locations:**
  - `src/pages/Landing.jsx` (profile image)
  - `src/components/projects/ProjectCard.jsx` (project images)
- **Benefit:** Images load only when they're about to enter the viewport, reducing initial page load time

### Code Cleanup

**Actions Taken:**
- Removed unused imports and dead code
- Consolidated duplicate logic where possible
- Maintained consistent component structure
- Removed unused assets (if any)

### Animation Performance

**Optimizations:**
- CSS keyframes for animations (no JavaScript animation libraries for simple effects)
- Transform and opacity properties (GPU-accelerated)
- Limited animation complexity to prevent jank
- IntersectionObserver for scroll-triggered animations (only animate when visible)

---

## Styling Architecture

### Tailwind CSS v4

**Setup:**
- Imported via `@import "tailwindcss"` in `index.css`
- PostCSS configured with `@tailwindcss/postcss` plugin
- Custom utilities defined in `Layout.jsx` and `index.css`

### Custom Utilities

**Defined in `index.css` and `Layout.jsx`:**
- `.gradient-purple`: Purple gradient background
- `.glow-purple`: Purple glow shadow effect
- `.tech-grid`: Subtle grid pattern for light mode
- `.slide-in-right`: Animation class for right slide-in
- `.slide-in-left`: Animation class for left slide-in

### Theme Colors

- Primary purple: `#8b5cf6`
- Accent purple: `#a855f7`
- Dark purple: `#6d28d9`
- Text purple: `#c4b5fd`

### Global Styles

- HTML scaled to 1.25x (transform: scale)
- Smooth transitions on all elements
- Inter font family
- Dark mode: black background (#000000)
- Light mode: gray-50 background (#f9fafb)

---

## Routing

**Routes:**
- `/` - Landing page (home)
- `/projects` - Projects page (defaults to "recent")
- `/projects?category=recent` - Recent projects
- `/projects?category=upcoming` - Upcoming projects
- `/contact` - Contact form page
- `/github` - GitHub repositories page

**Navigation:**
- Fixed navbar with backdrop blur
- Active route highlighting
- Theme toggle button
- Responsive design

---

## Form Validation

### Contact Form (`src/pages/Contact.jsx`)

**Validation Rules:**
- **Name:** Required, minimum 3 characters
- **Email:** Required, must match email regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Message:** Required, minimum 10 characters

**Features:**
- Real-time validation on blur
- Inline error messages below each field
- Submit button disabled when form is invalid
- Visual feedback (red border on invalid fields)
- Success banner on successful submission

**Implementation:**
- `validate()` function checks all fields
- `isFormValid()` function for submit button state
- Error state managed per field
- Errors cleared when user starts typing in a field

---

## Accessibility

**Features Implemented:**
- Semantic HTML labels for all form fields
- Alt text on all images
- Keyboard focus states with visible indicators
- High-contrast colors in both themes
- ARIA labels on interactive elements
- Proper form labels and input associations
- Focusable controls with keyboard navigation

---

## Limitations & Future Improvements

### Current Limitations

1. **No Backend Integration:**
   - Contact form uses localStorage only
   - No actual email sending functionality
   - Messages stored locally (not persistent across devices)

2. **API Key Security:**
   - Weather API key is hard-coded (for assignment purposes only)
   - In production, should use environment variables or backend proxy

3. **No Error Recovery:**
   - API failures show error messages but no retry mechanism
   - No offline support

4. **Limited Project Management:**
   - Projects are read-only for visitors
   - No admin interface for editing projects

5. **No SEO Optimization:**
   - Missing meta tags (Open Graph, Twitter Cards)
   - No sitemap or robots.txt

### Future Improvements

1. **Backend Integration:**
   - Connect contact form to email service
   - Store messages in database
   - Add authentication for admin features

2. **Enhanced Features:**
   - Project search with debouncing
   - Pagination for GitHub repositories
   - Weather forecast (not just current)
   - Dark mode toggle animation improvements

3. **Performance:**
   - Image optimization (WebP format, responsive images)
   - Code splitting for routes
   - Service worker for offline support

4. **SEO & Analytics:**
   - Add meta tags for social sharing
   - Implement Google Analytics
   - Add structured data (JSON-LD)

5. **Testing:**
   - Unit tests for components
   - Integration tests for API calls
   - E2E tests for user flows

---

## Build & Deployment

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Requirements

- Node.js ≥ 18
- npm (or pnpm/yarn)

---

## Dependencies

### Production

- `react` ^19.1.1
- `react-dom` ^19.1.1
- `react-router-dom` ^7.9.4
- `framer-motion` ^12.23.24
- `lucide-react` ^0.548.0

### Development

- `vite` ^7.1.7
- `tailwindcss` ^4.1.16
- `@tailwindcss/postcss` ^4.1.16
- `eslint` ^9.36.0
- `@vitejs/plugin-react` ^5.0.4

---

## Conclusion

Assignment 3 successfully extends the base portfolio with advanced features including API integrations, complex state management, enhanced filtering, and performance optimizations. The codebase is well-structured, maintainable, and follows React best practices.
