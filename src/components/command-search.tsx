import * as React from "react";
import { navigate } from "astro:transitions/client";
import { LucideBookDashed, LucideExternalLink } from "lucide-react";
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

const commands = [
  {
    heading: "Show some love",
    commands: [
      {
        title: "Use this template on your project",
        onSelect: () => window.open(use_template_url, "_blank")?.focus(),
        Icon: <LucideBookDashed className="w-4 h-4 mr-2" />,
        external: true,
      },
      {
        title: "Checkout Github Repository",
        onSelect: () => window.open(socials.github, "_blank")?.focus(),
        Icon: <SiGithub className="w-4 h-4 mr-2" />,
        external: true,
      },
      {
        title: "Follow me",
        onSelect: () => window.open(socials.twitter, "_blank")?.focus(),
        Icon: <SiX className="w-3 h-3 mr-2" />,
        external: true,
      },
    ],
  },
];

const TriggerButton = (props: ButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "relative px-4 border-x w-full justify-start text-xs font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 grow"
    )}
    {...props}
  >
    <span className="inline-flex">Search...</span>
    <kbd className="pointer-events-none absolute right-[0.5rem] top-[0.5rem] hidden h-5 select-none items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
      <span className="text-xs">⌘</span>K
    </kbd>
  </Button>
);

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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

          {commands.map((group) => (
            <CommandGroup heading={group.heading} key={group.heading}>
              {group.commands.map((command, index) => (
                <CommandItem
                  key={`group-${group.heading}-item-${index}`}
                  value={command.title}
                  onSelect={() => runCommand(command.onSelect)}
                  className="justify-between"
                >
                  <div className="flex">
                    {command.Icon}
                    <span>{command.title}</span>
                  </div>
                  {command.external && (
                    <LucideExternalLink className="w-2 h-2" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />
          <CommandGroup heading="Quick Links">
            {main_nav.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                onSelect={() =>
                  runCommand(() => navigate(item.href, { history: "push" }))
                }
                className="uppercase text-xs"
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>

          {/* <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
