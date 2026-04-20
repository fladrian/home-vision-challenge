import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { Button } from '@/components/ui/button';
import type { House } from '../types';
import { generatePropertySummary } from '@/lib/gemini';

import { Skeleton } from '@/components/ui/skeleton';

interface AISummaryProps {
  house: House;
  extraData: {
    sqft: number;
    beds: number;
    baths: number;
    garage: number;
    yearBuilt: number;
  };
}

export const AISummary = ({ house, extraData }: AISummaryProps) => {
  const [fullText, setFullText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasRequested, setHasRequested] = useState(false);

  const fetchSummary = async () => {
    setHasRequested(true);
    setIsGenerating(true);
    setErrorMsg('');
    setFullText('');
    
    try {
      const text = await generatePropertySummary(JSON.stringify(house), JSON.stringify(extraData));
      setFullText(text);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setErrorMsg(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="rounded-3xl border shadow-sm border-indigo-500/20 bg-linear-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-zinc-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="size-4" />
          AI-Enhanced Property Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasRequested ? (
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-muted-foreground">
              Generate an AI summary to get deeper insights about this property.
            </p>
            <Button 
                onClick={fetchSummary} 
                size="sm" 
                variant="outline" 
                className="mt-2 text-indigo-600 dark:text-indigo-400 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/50 rounded-xl font-bold"
            >
              <Sparkles className="mr-2 size-3" /> Generate AI Analysis
            </Button>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-muted-foreground relative min-h-[80px]">
            {errorMsg ? (
               <span className="flex items-center gap-2 text-amber-600">
                 <AlertTriangle className="size-4"/> {errorMsg}
               </span>
            ) : isGenerating ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : (
              <TypewriterText text={fullText} speed={15} />
            )}
            
            {!isGenerating && fullText && (
               <span className="ml-1 inline-block w-1.5 h-4 bg-indigo-500 animate-pulse align-middle" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
