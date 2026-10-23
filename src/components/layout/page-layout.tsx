import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

interface PageLayoutProps {
  /** Optional extra classes for the inner container */
  className?: string;
}

/**
 * Inner layout wrapper providing consistent container width,
 * horizontal padding, and bottom spacing for every page.
 * Top spacing is provided by the <main> element in App.tsx.
 */
export const PageLayout = ({ children, className }: PropsWithChildren<PageLayoutProps>) => {
  return (
    <div className={cn("container mx-auto px-6 pb-12", className)}>
      {children}
    </div>
  );
};
