import type { CollectionEntry } from "astro:content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "./card";

type Project = CollectionEntry<"projects">;

interface Props {
  projects: Project[];
}

export const ProjectsList = function ({ projects }: Props) {
  return (
    <Carousel opts={{ loop: true, align: "start" }}>
      <CarouselContent className="ml-0">
        {projects.map((project) => (
          <ProjectCard key={`project-${project.data.id}`} {...project} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
