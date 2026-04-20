import { Routes, Route } from 'react-router-dom';
import { HousesPage } from '@/pages/houses-page';
import { SavedPage } from '@/pages/saved-page';
import { ComparisonPage } from '@/pages/comparison-page';
import { HouseDetailPage } from '@/pages/house-detail-page';
import { NotFoundPage } from '@/pages/not-found-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HousesPage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/studio" element={<ComparisonPage />} />
      <Route path="/houses/:id" element={<HouseDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
