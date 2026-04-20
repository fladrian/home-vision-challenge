import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  /** Optional extra classes for the inner container */
  className?: string;
}

/**
 * Inner layout wrapper providing consistent container width,
 * horizontal padding, and bottom spacing for every page.
 * Top spacing is provided by the <main> element in App.tsx.
 */
export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`container mx-auto px-4 pb-8 ${className}`}>
      {children}
    </div>
  );
};
