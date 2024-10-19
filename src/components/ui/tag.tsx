import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  tag: string;
  className?: string;
}

export const Tag = ({ tag, className }: Props) => {
  return (
    <Badge
      variant="secondary"
      className={cn([
        "rounded-sm px-1 font-normal text-xs mt-1 mr-1",
        className,
      ])}
    >
      #{tag}
    </Badge>
  );
};
