import * as React from "react";
import { navigate } from "astro:transitions/client";
import { LucideBookDashed, LucideExternalLink, LucideLink } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";

import { Button, type ButtonProps } from "@/components/ui/button";
import { site_config } from "@/consts";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const { socials, main_nav } = site_config;

const use_template_url =
  "https://github.com/new?template_name=.raw&template_owner=cagdotin";

interface ICommand {
  title: string;
  onSelect: () => void;
  icon?: React.ReactElement;
  external?: boolean;
  commandKey?: string;
  className?: string;
}

interface ICommandGroup {
  heading: string;
  commands: ICommand[];
  seperate?: boolean;
}

const commands: ICommandGroup[] = [
  {
    heading: "NAVIGATION",
    seperate: false,
    commands: [
      ...main_nav.map((nav_item, index) => ({
        title: nav_item.title,
        onSelect: () => navigate(nav_item.href, { history: "push" }),
        // icon: <ChevronRight className="w-3 h-3" />,
        icon: <nav_item.Icon className="w-4 h-4" />,
        commandKey: `${index + 1}`,
        className: "uppercase text-xs",
      })),
    ],
  },
  {
    heading: "Quick Actions",
    commands: [
      {
        title: "Copy URL",
        onSelect: () => {
          navigator.clipboard.writeText(window.location.href);
        },
        icon: <LucideLink className="w-4 h-4" />,
        commandKey: "y",
      },
    ],
  },
  {
    heading: "Show some love",
    commands: [
      {
        title: "Use this template on your project",
        onSelect: () => window.open(use_template_url, "_blank")?.focus(),
        icon: <LucideBookDashed className="w-4 h-4" />,
        external: true,
      },
      {
        title: "Checkout Github Repository",
        onSelect: () => window.open(socials.github, "_blank")?.focus(),
        icon: <SiGithub className="w-4 h-4" />,
        external: true,
      },
      {
        title: "Follow me",
        onSelect: () => window.open(socials.twitter, "_blank")?.focus(),
        icon: <SiX className="w-3 h-3" />,
        external: true,
      },
    ],
  },
];

const commandsWithShortcut = commands.reduce(
  (acc, curr) => [...acc, ...curr.commands.filter((c) => c.commandKey)],
  [] as ICommand[]
);

const shortcutKeys = commandsWithShortcut.map((c) => c.commandKey);

const TriggerButton = (props: ButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "relative px-4 border-l-0 sm:border-x w-full justify-start text-xs font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 grow"
    )}
    {...props}
  >
    <span className="inline-flex">Search...</span>
    <kbd className="pointer-events-none absolute right-[0.5rem] top-[0.5rem] hidden h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
      <span className="text-xs">⌘</span>K
    </kbd>
  </Button>
);

interface ItemProps {
  command: ICommand;
  onSelect: () => void;
  className?: string;
}

const Item = ({ command, onSelect, className }: ItemProps) => {
  return (
    <CommandItem
      value={command.title}
      onSelect={onSelect}
      className={cn([command.className, className])}
    >
      <div className="flex items-center grow">
        {command.icon && <div className="w-8">{command.icon}</div>}
        <span>{command.title}</span>
      </div>
      {command.external && <LucideExternalLink className="w-4 h-4" />}
      {command.commandKey && (
        <CommandShortcut className="hidden uppercase sm:inline-block">
          ⌘{command.commandKey}
        </CommandShortcut>
      )}
    </CommandItem>
  );
};

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && shortcutKeys.includes(e.key)) {
        e.preventDefault();
        const command = commandsWithShortcut.find(
          (c) => c.commandKey == e.key
        )!;
        console.log(commandsWithShortcut);
        console.log(command);
        console.log(e.key);
        runCommand(command.onSelect);
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((open) => !open);
  };

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <TriggerButton onClick={handleTriggerClick} />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {commands.map((group, index) => (
            <>
              {group.seperate && <CommandSeparator />}
              <CommandGroup heading={group.heading} key={group.heading}>
                {group.commands.map((command, index) => (
                  <Item
                    key={`group-${group.heading}-item-${index}`}
                    command={command}
                    onSelect={() => runCommand(command.onSelect)}
                  />
                ))}
              </CommandGroup>
            </>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
