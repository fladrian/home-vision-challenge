import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/header';
import { HousesPage } from '@/pages/houses-page';
import { FavoritesPage } from '@/pages/favorites-page';
import { HouseDetailPage } from '@/pages/house-detail-page';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-50">
      <Header />
      
      <main className="min-h-[calc(100vh-5rem)]">
        <Routes>
          <Route path="/" element={<HousesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/houses/:id" element={<HouseDetailPage />} />
          <Route path="*" element={
            <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-4xl font-black">404</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>

      <footer className="border-t bg-white py-12 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <span className="text-xl font-black tracking-tighter">
                HOME<span className="text-primary italic">VISION</span>
              </span>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Empowering homeowners and buyers with the most advanced real estate technology.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-bold">
              <a href="#" className="hover:text-primary">About Us</a>
              <a href="#" className="hover:text-primary">Listings</a>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-xs text-muted-foreground">
            © 2026 HomeVision Inc. All rights reserved. Built with TanStack & Shadcn.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
