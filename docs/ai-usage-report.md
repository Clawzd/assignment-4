# AI Usage Report — Assignment 3

This document details how AI tools were used during the development of Assignment 3, what was generated, what modifications were made, and what was learned.

## Overview

AI tools (primarily ChatGPT and Cursor) were used as coding assistants to help with API integrations, component structure, and implementation patterns. All AI-generated code was reviewed, modified, and integrated to match the project's design system and requirements.

---

## Entry 1 – GitHub API Integration Component

- **Tool Used:** ChatGPT
- **Date:** During Assignment 3 development
- **Prompt:** "Help me create a React component that fetches GitHub repositories from the GitHub API for a user, displays them in cards, and handles loading and error states"
- **AI Output Summary:** 
  - Suggested a component structure with useState and useEffect hooks
  - Provided basic fetch logic with error handling
  - Suggested loading, error, and success states
  - Basic card layout structure
- **My Edits:**
  - Integrated with the existing theme system using `useTheme()` hook
  - Added alternating slide-in animations (left/right) using CSS keyframes
  - Styled cards to match the portfolio's purple/dark theme with glow effects
  - Added formatted date display using toLocaleDateString
  - Implemented the specific API endpoint with username "Clawzd" and per_page=6
  - Added proper error messages matching the design system
- **What I Learned:**
  - How to structure API calls in React with proper error handling
  - Managing multiple component states (loading, error, success)
  - Integrating external API data with existing design systems
  - CSS keyframe animations for entrance effects

---

## Entry 2 – Weather API Component

- **Tool Used:** ChatGPT
- **Date:** During Assignment 3 development
- **Prompt:** "Create a Weather component using OpenWeatherMap API in React without using .env files, with city input and localStorage persistence"
- **AI Output Summary:**
  - Suggested component with fetch logic for OpenWeatherMap API
  - Basic state management for city, weather data, and status
  - Simple form with input and button
  - Basic error handling
- **My Edits:**
  - Hard-coded API key directly in component (as required for assignment)
  - Added localStorage persistence for the last selected city
  - Integrated IntersectionObserver for scroll-triggered fade-in animation
  - Styled to match portfolio theme (purple borders, dark background, glow effects)
  - Added formatted time display for "Last updated"
  - Improved error messages and loading states
  - Added proper form submission handling
- **What I Learned:**
  - How to work with OpenWeatherMap API endpoints
  - Using IntersectionObserver for scroll animations
  - localStorage integration for user preferences
  - Structuring API components without environment variables

---

## Entry 3 – Combined Filtering Logic on Projects Page

- **Tool Used:** Cursor (inline suggestions)
- **Date:** During Assignment 3 development
- **Prompt:** "Add a level filter (Beginner, Intermediate, Advanced) to the existing Projects page that works with search, tags, and sort filters"
- **AI Output Summary:**
  - Suggested adding a new state variable for selectedLevel
  - Basic filter logic to check project.level
  - Suggested select dropdown UI
- **My Edits:**
  - Integrated level filter into existing useMemo filtering logic
  - Added level field to all projects in projectsData.js
  - Styled the level select to match existing sort select design
  - Updated the "Clear Filters" button to reset level filter
  - Ensured all filters work together (search, tags, level, sort)
  - Added level filter to dependency array of useMemo
- **What I Learned:**
  - How to combine multiple filters in a single useMemo hook
  - Maintaining filter state consistency
  - UI/UX considerations for multiple filter controls

---

## Entry 4 – Enhanced Form Validation

- **Tool Used:** ChatGPT
- **Date:** During Assignment 3 development
- **Prompt:** "Improve React form validation with minimum character requirements, real-time validation, and disabled submit button when invalid"
- **AI Output Summary:**
  - Suggested validation function with character length checks
  - Basic error state management
  - Suggested disabled button logic
- **My Edits:**
  - Implemented specific validation rules (name: min 3 chars, message: min 10 chars)
  - Added real-time validation with onBlur handlers
  - Created isFormValid() function for submit button state
  - Improved error messages to be more specific
  - Added visitor name saving to localStorage for personalized greeting
  - Integrated with existing form styling and theme
- **What I Learned:**
  - Real-time form validation patterns
  - Disabling submit buttons based on validation state
  - Better UX with inline error messages
  - Connecting form submissions to other parts of the app (visitor name)

---

## Entry 5 – CSS Keyframe Animations

- **Tool Used:** ChatGPT
- **Date:** During Assignment 3 development
- **Prompt:** "Create CSS keyframe animations for elements sliding in from left and right with smooth easing"
- **AI Output Summary:**
  - Provided basic @keyframes syntax
  - Suggested translateX transforms
  - Basic animation properties
- **My Edits:**
  - Adapted animations to match portfolio's design (80px translate distance)
  - Added opacity transitions for smoother appearance
  - Created reusable CSS classes (.slide-in-left, .slide-in-right)
  - Integrated with existing index.css structure
  - Applied animations conditionally based on array index (alternating pattern)
- **What I Learned:**
  - CSS keyframe animation syntax and best practices
  - Combining transforms with opacity for smooth animations
  - Creating reusable animation classes
  - Conditional class application in React

---

## Entry 6 – State Management for Visitor Name

- **Tool Used:** Cursor (inline suggestions)
- **Date:** During Assignment 3 development
- **Prompt:** "Save visitor name from contact form to localStorage and use it for personalized greeting on landing page"
- **AI Output Summary:**
  - Suggested localStorage.setItem in form submission
  - Basic localStorage.getItem in Landing component
- **My Edits:**
  - Implemented visitor name saving in Contact form submission
  - Updated Landing page to check for "visitorName" first, then fallback to "portfolioUserName"
  - Added event listeners for storage events and focus events to update greeting in real-time
  - Changed greeting text to "Welcome back, {name}!" when visitor name exists
  - Properly cleaned up event listeners in useEffect
- **What I Learned:**
  - Cross-component state synchronization using localStorage
  - Event-driven updates for same-tab localStorage changes
  - Proper cleanup of event listeners in React

---

## Summary

### AI Tools Used
- **ChatGPT:** For component structure, API integration patterns, and validation logic
- **Cursor:** For inline code suggestions and quick implementations

### Key Modifications Made
1. All AI-generated code was adapted to match the existing purple/dark theme
2. Integrated with existing state management (useTheme hook)
3. Added animations and transitions for better UX
4. Improved error handling and user feedback
5. Connected features together (visitor name → greeting, weather city persistence)

### Learning Outcomes
- API integration patterns in React (GitHub, OpenWeatherMap)
- Complex filtering logic with multiple criteria
- Form validation with real-time feedback
- CSS animations and transitions
- localStorage for state persistence
- Event-driven state updates
- IntersectionObserver for scroll animations

### Ethics & Understanding
- AI was used as a learning and productivity tool, not a replacement for understanding
- All generated code was reviewed, tested, and modified to fit the project
- No private data was shared with AI tools
- The final implementation demonstrates understanding of the concepts, not just copy-paste

---

## Conclusion

AI tools significantly accelerated development by providing boilerplate code and implementation patterns. However, all code was thoroughly reviewed, modified to match the project's design system, and integrated with existing features. The final product demonstrates a clear understanding of React patterns, API integration, state management, and UI/UX principles.
