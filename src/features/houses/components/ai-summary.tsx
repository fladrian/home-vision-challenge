import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { TypewriterText } from '@/components/ui/typewriter-text';
import { Button } from '@/components/ui/button';
import type { House, PropertyDetails } from '../types';
import { generatePropertySummary } from '@/lib/gemini';

interface AISummaryProps {
  /** The house listing to generate an AI summary for */
  house: House;
  /** Extended property details (beds, baths, sqft, etc.) used as context for the AI prompt */
  extraData: PropertyDetails;
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
    <Card className="rounded-3xl border shadow-sm border-accent/25 bg-linear-to-br from-accent/10 to-background dark:from-accent/15 dark:to-background/40">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-accent">
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
                className="mt-2 rounded-xl font-bold"
            >
              <Sparkles className="mr-2 size-3" /> Generate AI Analysis
            </Button>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-muted-foreground relative min-h-[80px]">
            {errorMsg ? (
               <span className="flex items-center gap-2 text-amber-600 py-1">
                 <AlertTriangle className="size-4"/> {errorMsg}
               </span>
            ) : isGenerating ? (
              <TypewriterText text="Analyzing property features and market potential..." speed={15} className="animate-pulse" />
            ) : (
              <TypewriterText text={fullText} speed={15} />
            )}
            
            {!isGenerating && fullText && (
               <span className="ml-1 inline-block w-1.5 h-4 bg-primary animate-pulse align-middle" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
