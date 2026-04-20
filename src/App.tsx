import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { HousesPage } from '@/pages/houses-page';
import { SavedPage } from '@/pages/saved-page';
import { ComparisonPage } from '@/pages/comparison-page';
import { HouseDetailPage } from '@/pages/house-detail-page';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-50">
      <Header />
      
      <main className="min-h-[calc(100vh-5rem)] pt-8">
        <Routes>
          <Route path="/" element={<HousesPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/studio" element={<Navigate to="/comparison" replace />} />
          <Route path="/houses/:id" element={<HouseDetailPage />} />
          <Route path="*" element={
            <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-4xl font-black">404</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>

      <footer className="border-t bg-white py-10 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-xl font-black tracking-tighter">
                Props<span className="text-primary italic">Vision</span>
              </span>
              <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                A real estate platform built with modern tooling.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 text-sm md:items-end">
              <p className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Built by</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com/in/fladrian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  fladrian
                </a>
                <a
                  href="https://github.com/fladrian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  fladrian
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            © 2026{' '}
            <a
              href="https://github.com/fladrian"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-primary transition-colors"
            >
              fladrian
            </a>
            . All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
