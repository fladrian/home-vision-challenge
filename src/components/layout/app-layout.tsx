import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-50">
      <Header />
      
      <main className="min-h-[calc(100vh-5rem)] pt-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};
