import { cn } from "@/lib/utils";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  underline?: boolean;
  [key: string]: any;
}

export const Link = function (props: Props) {
  const { href, external, className, underline, children, ...rest } = props;
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      className={cn(
        "inline-block transition-colors duration-300 ease-in-out text-foreground",
        underline &&
          "underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
};
