import type { PropsWithChildren } from 'react';
import { Header } from './header';
import { Footer } from './footer';


export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />

      <main className="min-h-[calc(100vh-5rem)] pt-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};
