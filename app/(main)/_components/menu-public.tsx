"use client";

import Logo from "@/app/(landing)/_components/logo-public";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { ExternalLink, Settings2, Sparkle, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import Item from "./item";
import { useSettings } from "@/hooks/use-settings";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings } from "@/components/modals/settings";
import { ModeToggle } from "@/components/mode-toggle";
import { Label } from "@/components/ui/label";

const Menu = () => {
  const settings = useSettings();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-7 animate-shimmer dark:invert items-center justify-center rounded-full bg-[linear-gradient(110deg,#000103,45%,#3C4C63,55%,#000103)] bg-[length:200%_100%] px-2 py-4 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform ease-in-out duration-400">
          <p className="dark:invert dark:text-black text-sm flex flex-row">
            Built with&nbsp;&nbsp;
            <Logo />
          </p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem>
          <SignInButton mode="modal">
            <a
              href="/"
              target="_blank"
              className="flex flex-row ml-3 items-center text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              &nbsp;&nbsp;Try Kami &nbsp;|&nbsp; Sign In
            </a>
          </SignInButton>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center justify-between">
            <div>
              <ModeToggle />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label className="text-sm">Appearance</Label>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
