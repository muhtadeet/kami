"use client";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { Sparkle } from "lucide-react";
import { shadesOfPurple } from "@clerk/themes";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 fixed top-0 flex items-center w-full p-6 pointer-events-auto",
        scrolled && ""
      )}
    >
      <div className="hidden sm:block mr-7">
        <Logo />
      </div>
      <div className="sm:hidden">
        <ModeToggle />
      </div>
      <div className="md:ml-auto md:justify-end justify-end w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <button className="sm:px-6 hidden sm:block py-2 text-black dark:text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                Log In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border bg-[linear-gradient(110deg,#000103,45%,#3C4C63,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform hover:-translate-y-1 ease-in-out duration-400 flex-row">
                Get Kami&nbsp;
                <span className="hidden sm:block">&nbsp;&#11212;</span>
                <Sparkle className="sm:hidden h-4 w-4 pb-[0.05rem]" />
              </button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Link href="/documents">
              <button className="inline-flex h-12 mr-3 animate-shimmer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000103,45%,#41536C,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform hover:-translate-y-1  duration-400 flex-row">
                Enter Kami&nbsp;
                <span className="hidden sm:block">&nbsp;&#11212;</span>
                <Sparkle className="sm:hidden h-4 w-4 pb-[0.05rem]" />
              </button>
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: shadesOfPurple,
              }}
            />
          </>
        )}
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
