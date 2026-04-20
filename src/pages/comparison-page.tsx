import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHouseComparison, HouseCard } from '@/features/houses';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { PageLayout } from '@/components/layout/page-layout';

export const ComparisonPage = () => {
  const { 
    favorites, 
    averagePrice, 
    priceRange, 
    dataPoints,
    aiVerdict,
    isEvaluating,
    evaluationError,
    generateVerdict
  } = useHouseComparison();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedFavorites = favorites.filter(h => selectedIds.includes(h.id));

  // Determine the metrics to show in the table based on selected properties
  const housesToCompare = selectedIds.length > 0 ? selectedFavorites : favorites;

  return (
    <PageLayout>
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <Link to="/saved" className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 size-4" />
            Back to Saved
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Comparison <span className="text-primary italic">Studio</span></h1>
          <p className="text-muted-foreground text-lg mt-2">
            Professional analysis of your saved properties to evaluate market value and investment potential.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <BarChart2 className="size-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Studio pending selection</h2>
          <p className="max-w-xs text-muted-foreground">
            You need to save properties first to start comparing them.
          </p>
          <Button asChild className="mt-4 font-bold rounded-xl" size="lg">
            <Link to="/">Explore Listings</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Property Matrix */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-2xl">
              <span className="font-bold">Select properties to compare (Max 3)</span>
              <span className="text-sm font-medium bg-white dark:bg-zinc-900 px-3 py-1 rounded-full shadow-sm">
                {selectedIds.length} / 3 Selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence>
                {favorites.map((house) => {
                  const isSelected = selectedIds.includes(house.id);
                  const canSelect = isSelected || selectedIds.length < 3;

                  return (
                    <motion.div 
                      layout
                      key={house.id}
                      className="relative block group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      {/* Intercept overlay for selection */}
                      <div 
                        className={`absolute inset-0 z-10 cursor-pointer rounded-xl border-[3px] transition-all duration-300 ${isSelected ? 'border-primary' : 'border-transparent hover:border-primary/50'} ${!canSelect && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (canSelect) toggleSelection(house.id);
                        }}
                      >
                        <div className="absolute top-2 left-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-lg p-1.5 shadow-sm">
                          <Checkbox 
                            checked={isSelected}
                            disabled={!canSelect}
                            className={`size-5 ${isSelected ? 'data-[state=checked]:bg-primary' : ''}`}
                          />
                        </div>
                      </div>
                      
                      <div className={!canSelect && !isSelected ? 'opacity-50 grayscale transition-all' : 'transition-all'}>
                        <HouseCard house={house} />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Comparative Metrics */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <Card className="rounded-3xl border shadow-lg border-primary/20 bg-linear-to-br from-primary/5 to-white dark:from-primary/10 dark:to-zinc-900 overflow-hidden">
                <CardHeader className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border-b flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="size-5 text-primary" />
                    Market Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Average Price</p>
                      <p className="text-2xl font-black text-primary">{averagePrice}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price Range</p>
                      <p className="text-sm font-bold mt-1 line-clamp-2">{priceRange}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-sm">
                    <div className="text-sm font-medium leading-relaxed min-h-[40px] mb-4">
                      {evaluationError ? (
                        <span className="flex items-center gap-2 text-amber-600">
                           <AlertTriangle className="size-4"/> {evaluationError}
                        </span>
                      ) : (
                        <TypewriterText text={aiVerdict} speed={15} />
                      )}
                    </div>
                    <Button 
                      onClick={() => generateVerdict(housesToCompare)} 
                      disabled={isEvaluating || selectedIds.length === 0}
                      className="w-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    >
                      {isEvaluating ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Analyzing Market...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 size-4" />
                          Generate AI Verdict
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Table */}
              <Card className="rounded-3xl overflow-hidden shadow-sm">
                 <CardHeader className="bg-zinc-50 dark:bg-zinc-800/20 border-b pb-4">
                    <CardTitle className="text-lg">Detailed Comparison</CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                  {housesToCompare.length > 0 ? (
                    <Table>
                      <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                        <TableRow>
                          <TableHead className="w-[100px] font-bold">Feature</TableHead>
                          {housesToCompare.map((house, i) => (
                            <TableHead key={house.id} className="font-bold">
                              Prop {i + 1}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dataPoints.map((point, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium bg-zinc-50/30 dark:bg-zinc-900/30 border-r">{point.feature}</TableCell>
                            {housesToCompare.map(house => {
                              const val = point.values.find(v => v.houseId === house.id)?.value;
                              return (
                                <TableCell key={`${point.feature}-${house.id}`}>
                                  {val}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No properties available for comparison.
                    </div>
                  )}
                 </CardContent>
              </Card>

            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
