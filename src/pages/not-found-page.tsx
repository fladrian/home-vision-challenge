import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/page-layout';

export const NotFoundPage = () => {
  return (
    <PageLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <div className="rounded-full bg-destructive/10 p-6">
          <AlertCircle className="size-16 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="max-w-md text-muted-foreground">
            The property or page you are looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        <Link to="/">
          <Button size="lg" className="gap-2 font-bold">
            <Home className="size-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
};
