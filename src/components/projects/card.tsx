import type { CollectionEntry } from "astro:content";
import { Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";

type Project = CollectionEntry<"projects">;

interface Props extends Project {}

export const ProjectCard = function ({ data: data }: Props) {
  const { title, description, image, disabled, link } = data;

  return (
    <CarouselItem className="basis-1/2 sm:basis-1/3 pl-0 border-r flex flex-col justify-end">
      <img src={image} alt={`${title} banner image`} />

      <h3 className="font-bold text-sm px-2 py-1">{title}</h3>
      <p className="text-xs px-2 pt-1 pb-3 text-muted-foreground">
        {description}
      </p>
      <div className="flex mt-auto">
        {link && (
          <Button
            size="sm"
            variant={disabled ? "secondary" : "default"}
            disabled={disabled}
            className="grow justify-start border-r text-xs"
          >
            <Globe className="w-4 h-4 mr-2" />
            Website
            <ExternalLink className="w-4 h-4 ml-auto" />
          </Button>
        )}
      </div>
    </CarouselItem>
  );
};
