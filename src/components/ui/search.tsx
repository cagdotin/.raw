import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// TODO: update this placeholder.
export const Search = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "relative px-4 border-x w-full justify-start text-xs font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 grow"
      )}
      //   onClick={() => setOpen(true)}
      //   {...props}
    >
      <span className="inline-flex">Search...</span>
      <kbd className="pointer-events-none absolute right-[0.5rem] top-[0.5rem] hidden h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};
