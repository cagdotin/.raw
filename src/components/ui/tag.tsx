import { Badge } from "@/components/ui/badge";

interface Props {
  tag: string;
}

export const Tag = ({ tag }: Props) => {
  return (
    <Badge
      variant="secondary"
      className="rounded-sm px-1 font-normal text-xs mt-1 mr-1"
    >
      #{tag}
    </Badge>
  );
};
