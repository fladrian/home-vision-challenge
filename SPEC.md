# Technical Specification

This document details the technologies, libraries, and architectural decisions behind **PropsVision**.

## 🛠 Tech Stack

### Frontend Core
- **React 19**: Utilizing the latest React features and optimizations.
- **TypeScript**: Full type safety across the entire application flow.
- **Vite**: Ultra-fast build tool and development server.

### State Management & Data Fetching
- **Zustand**: Lightweight, hook-based state management for favorites and UI states (with persistence).
- **TanStack Query (v5)**: Robust server-state management, caching, and infinite loading.
- **Axios**: Promised-based HTTP client for API communication.

### UI & Styling
- **Tailwind CSS 4**: Modern utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: High-quality, accessible UI components.
- **Framer Motion**: Smooth, declarative animations.
- **Lucide React**: Consistent and beautiful icon set.

### AI Integration
- **Google Generative AI (Gemini API)**: Powering property summaries and comparative market analysis.

### Utilities
- **Zod**: Schema-based validation for API responses and data integrity.
- **React Router 7**: Declarative routing for seamless navigation.
- **TanStack Virtual**: Virtualization for high-performance long lists.

---

## 🏗 Development Notes

### Project Structure
```text
src/
├── api/             # API clients and raw fetch functions
├── assets/          # Images, logos, and fonts
├── components/      # Shared UI and Layout components
├── config/          # Environment and app configuration
├── features/        # Feature-based modules (Houses, Saved)
├── hooks/           # Shared custom hooks
├── lib/             # Shared libraries and utility functions
├── pages/           # Page-level components
├── providers/       # Context providers
├── routes/          # Navigation configuration
├── stores/          # Global state (Zustand)
└── types/           # Shared TypeScript interfaces
```

### Performance Optimizations
- **Virtualization**: The property feed uses `@tanstack/react-virtual` to render only the visible items, preventing DOM bloat.
- **Lazy Loading**: Images are lazy-loaded to save bandwidth and improve initial load time.
- **Caching**: TanStack Query caches API responses to minimize redundant network requests.

---

## 📜 Original Template Info (Vite)

This project was bootstrapped with the Vite React-TS template.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
