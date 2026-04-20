# PropsVision | Precision Property Intelligence

A premium real estate underwriting and collateral evaluation platform built for modern high-performance property analysis.

## 🔗 Quick Links
- **GitHub Repository**: [fladrian/home-vision-challenge](https://github.com/fladrian/home-vision-challenge)
- **LinkedIn**: [linkedin.com/in/fladrian](https://linkedin.com/in/fladrian)

## 🚀 Quick Start

Follow these steps to run the application locally:

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
# Create a .env file and add the following variables:
VITE_API_URL=https://staging.homevision.co/api_project
VITE_GEMINI_API_KEY=your_gemini_api_key_here

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

### 3. AI-Powered Property Intelligence
- **AI Summary (Property Detail)**: Utilizes Google Gemini AI to analyze property descriptions and provide concise, professional summaries for underwriters.
- **AI Comparative Estimation**: In the Comparison Studio, the AI analyzes selected properties to provide a smart market estimation and comparative analysis report.

### 4. Saved Collection
- **Persistent Favorites**: Manage a collection of properties of interest.
- **State Persistence**: Uses Zustand with middleware to ensure your saved properties are preserved across browser sessions.

### 5. Premium UI/UX
- **Modern Aesthetics**: Built with a "Prop-Tech" design language using Tailwind CSS 4 and Shadcn/UI.
- **Dark Mode Support**: Full system-aware dark mode for comfortable long-session analysis.
- **Micro-Animations**: Smooth transitions powered by Framer Motion.

---

## 🏗 System Architecture

The project follows a **Feature-Based Architecture**, ensuring high maintainability and scalability:

- **`src/features`**: Self-contained modules (Houses, Comparisons) with their own components, hooks, and types.
- **`src/components/layout`**: Shared layout shells (AppLayout, PageLayout).
- **`src/stores`**: Global state management with Zustand.
- **`src/lib`**: Shared utilities and API clients (Axios, Gemini).
