# PropsVision | Precision Property Intelligence

A premium real estate underwriting and collateral evaluation platform built for modern high-performance property analysis. PropsVision addresses the critical pain points of real estate underwriters and investors—specifically the slow, fragmented process of comparing properties and extracting actionable insights from raw data. By combining infinite scrolling for rapid discovery, a dedicated Comparison Studio for side-by-side analysis, and AI-driven market intelligence to summarize technical details, the platform dramatically reduces time-to-decision and provides immediate, data-backed financial clarity.

## 🔗 Quick Links
- **Live Demo**: [https://propsvision.netlify.app/](https://propsvision.netlify.app/)
- **GitHub Repository**: [fladrian/home-vision-challenge](https://github.com/fladrian/home-vision-challenge)
- **LinkedIn**: [linkedin.com/in/fladrian](https://linkedin.com/in/fladrian)

## 🚀 Quick Start

Follow these steps to run the application locally:

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
# Create a .env file and add the following variables:
VITE_API_URL=<YOUR_BASE_URL>
VITE_GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>

# 3. Start development server
pnpm dev
```

### 🔑 How to get a Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **"Get API key"** in the sidebar.
4. Click **"Create API key"** (you can choose an existing project or a new one).
5. Copy the generated key and paste it into your `.env` file as `VITE_GEMINI_API_KEY`.

> [!IMPORTANT]
> **VITE_API_URL**: This is the base endpoint for the property listings. If you don't provide it, the application won't be able to fetch the houses data.

---

## 🛠 Application Flows & Features

### 1. Intelligent Property Feed
- **Infinite Scrolling**: High-performance grid and list views using `@tanstack/react-virtual` for smooth 60fps scrolling even with thousands of listings.
- **Precision Filters**: Filter by price range and listing status to find target collateral quickly.
- **Dual View Modes**: Switch between immersive grid view and data-rich list view.

### 2. Comparison Studio (Feature Highlight)
- **Side-by-Side Analysis**: Select multiple properties to compare their technical specs, pricing, and collateral value.
- **Actionable Insights**: Centralized hub to evaluate multiple investment opportunities at once.

### 3. AI & Financial Intelligence
- **AI Summary**: Utilizes Google Gemini AI to analyze property technical data and provide professional summaries for underwriters.
- **AI Comparative Verdict**: In the Comparison Studio, the AI analyzes selected properties to provide a smart market estimation and "best value" verdict.
- **Mortgage Estimator**: Real-time financial calculator with adjustable down payment, interest rates, and loan terms to evaluate monthly affordability.

### 4. Geospatial & Visual Tools
- **Interactive Mapping**: Built with Leaflet, providing precise geolocation for every property listing.
- **Map View Integration**: Visualize property location directly within the detail page via a dedicated tab.
- **Dynamic Image Gallery**: Immersive property visuals with optimized lazy loading.

### 5. Persistent Portfolio
- **Saved Collection**: Manage a curated list of properties for future analysis.
- **Zustand Persistence**: Saved properties are preserved across browser sessions using local storage middleware.

### 6. Premium UI/UX
- **Prop-Tech Aesthetics**: A modern, "airy" and spacious design language built with Tailwind CSS 4 and Shadcn/UI.
- **Responsive Navigation**: Optimized for mobile and desktop, featuring scrollable tab navigation and stacked layouts for small screens.
- **Dark Mode & Motion**: System-aware dark mode and smooth transitions powered by Framer Motion.

---

## 🗺️ View Breakdown & Routes

### 🏠 Main Listings (`/`)
The entry point for property discovery.
- **Features**: Infinite scroll (TanStack Virtual), Grid/List view toggle, and search/filter controls.
- **UX**: High-performance rendering for massive datasets.

### 📄 Property Detail (`/houses/:id`)
A deep-dive into individual property collateral.
- **Tabs System**: Organized into **Details** (AI Summary), **Location** (Interactive Map), and **Calculator** (Mortgage Estimator).
- **Features**: Dynamic specs (Beds, Baths, SqFt), verified owner info, and "exclusive listing" badges.

### 🔖 Saved Properties (`/saved`)
Your personal shortlist.
- **Features**: Quick access to your favorite listings and a direct bridge to the Comparison Studio.

### 📊 Comparison Studio (`/studio`)
The platform's powerhouse for decision-making.
- **Features**: A selection matrix for up to 3 properties, side-by-side technical comparison, and AI-driven market snapshot.

---

## 🏗 System Architecture

The project follows a **Feature-Based Architecture**, ensuring high maintainability and scalability:

- **`src/features`**: Self-contained modules (Houses, Comparisons) with their own components, hooks, and types.
- **`src/components/layout`**: Shared layout shells (AppLayout, PageLayout).
- **`src/stores`**: Global state management with Zustand.
- **`src/lib`**: Shared utilities and API clients (Axios, Gemini).
