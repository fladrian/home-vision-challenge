import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { HousesPage } from '@/pages/houses-page';
import { SavedPage } from '@/pages/saved-page';
import { ComparisonPage } from '@/pages/comparison-page';
import { HouseDetailPage } from '@/pages/house-detail-page';

function App() {
  return (
    <AppLayout>
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
    </AppLayout>
  );
}

export default App;
