import { LinkedInIcon, GithubIcon } from '@/components/ui/icons';

export const Footer = () => {
  const author = "fladrian"
  return (
    <footer className="border-t bg-white py-10 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="text-xl font-black tracking-tighter">
              Props<span className="text-primary italic">Vision</span>
            </span>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              Smart property evaluation and collateral intelligence.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm md:items-end">
            <p className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Built by</p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/fladrian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
              >
                <LinkedInIcon className="size-4" />
                {author}
              </a>
              <a
                href="https://github.com/fladrian"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
              >
                <GithubIcon className="size-4" />
                {author}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://github.com/fladrian"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-primary transition-colors"
          >
            {author}
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};
