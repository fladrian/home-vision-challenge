import { useMemo, useState } from 'react';
import { useHousesStore } from '../stores/use-houses-store';
import { generateComparisonVerdict } from '@/lib/gemini';
import type { House } from '../types';

export const useHouseComparison = () => {
  const { favorites } = useHousesStore();
  
  const [aiVerdict, setAiVerdict] = useState<string>('Select properties to compare their features and value.');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationError, setEvaluationError] = useState<string>('');

  const comparisonData = useMemo(() => {
    // Basic calculations
    const prices = favorites.map(h => h.price);
    const averagePrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    const formatPrice = (p: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

    const priceRange = prices.length > 1 
      ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}` 
      : formatPrice(minPrice);

    // Data points for the table.
    const dataPoints = [
      {
        feature: 'Price',
        values: favorites.map(h => ({ houseId: h.id, value: formatPrice(h.price) }))
      },
      {
        feature: 'Location',
        values: favorites.map(h => ({ houseId: h.id, value: h.address.split(',')[1] || 'Unknown' }))
      },
      {
        feature: 'Listed By',
        values: favorites.map(h => ({ houseId: h.id, value: h.homeowner }))
      },
    ];

    return {
      averagePrice: formatPrice(averagePrice),
      priceRange,
      dataPoints,
    };
  }, [favorites]);

  const generateVerdict = async (housesToCompare: House[]) => {
    if (housesToCompare.length === 0) {
      setAiVerdict('Select properties to compare their features and value.');
      return;
    }
    
    if (housesToCompare.length === 1) {
      setAiVerdict(`PropsVision Verdict: You have selected a great property in ${housesToCompare[0].address.split(',')[1] || "its area"}. Add more to compare!`);
      return;
    }

    setIsEvaluating(true);
    setEvaluationError('');
    setAiVerdict('Analyzing the best value across your selection...');

    try {
      // Just pass identifying and pricing information to the prompt
      const condensedProperties = housesToCompare.map(h => ({
        address: h.address,
        price: h.price
      }));
      
      const verdict = await generateComparisonVerdict(JSON.stringify(condensedProperties));
      setAiVerdict(verdict);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to analyze properties.";
      setEvaluationError(message);
      setAiVerdict("Could not fetch the evaluation at this time.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return {
    favorites,
    ...comparisonData,
    aiVerdict,
    isEvaluating,
    evaluationError,
    generateVerdict
  };
};
