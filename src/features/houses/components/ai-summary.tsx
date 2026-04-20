import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { TypewriterText } from '@/components/ui/typewriter-text';
import type { House } from '../types';
import { generatePropertySummary } from '@/lib/gemini';

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

  useEffect(() => {
    let isMounted = true;
    
    const fetchSummary = async () => {
      setIsGenerating(true);
      setErrorMsg('');
      setFullText('');
      
      try {
        const text = await generatePropertySummary(JSON.stringify(house), JSON.stringify(extraData));
        if (isMounted) {
          setFullText(text);
          setIsGenerating(false);
        }
      } catch (e: unknown) {
        if (isMounted) {
          setIsGenerating(false);
          const message = e instanceof Error ? e.message : "Something went wrong.";
          setErrorMsg(message);
        }
      }
    };

    const startTimeout = setTimeout(() => {
       fetchSummary();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [house, extraData]);

  return (
    <Card className="rounded-3xl border shadow-sm border-indigo-500/20 bg-linear-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-zinc-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="size-4" />
          AI-Enhanced Property Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm leading-relaxed text-muted-foreground relative min-h-[80px]">
          {errorMsg ? (
             <span className="flex items-center gap-2 text-amber-600">
               <AlertTriangle className="size-4"/> {errorMsg}
             </span>
          ) : (
            <TypewriterText text={fullText} speed={15} />
          )}
          
          {isGenerating && (
            <span className="ml-1 inline-block w-1.5 h-4 bg-indigo-500 animate-pulse align-middle" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
