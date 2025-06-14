import { cn } from '../lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "text-lg md:text-4xl font-bold tracking-wide text-foreground select-none",
        className
      )}
    >
      AM SPORTS
    </div>
  );
};
