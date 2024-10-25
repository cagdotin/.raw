import { Link } from "./link";

interface Props {
  tag: string;
  link?: boolean;
  hasNext?: boolean;
  className?: string;
}

export const Tag = function ({ tag, link, hasNext, className }: Props) {
  if (link) {
    return (
      <Link className={className} href={`/tags/${tag}`}>
        {tag}
        {hasNext && ","}
      </Link>
    );
  }

  return (
    <span className={className}>
      {tag}
      {hasNext && ","}
    </span>
  );
};
