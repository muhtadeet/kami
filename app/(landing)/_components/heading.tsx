"use client";

import React from "react";
import Heroes from "./heroes";
import Footer from "./footer";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { Sparkle } from "lucide-react";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      <div className="max-w-3xl mt-32 md:mt-40 xl:mt-28 space-y-4 md:space-y-2 xl:space-y-4 z-50 inset-0 w-full left-0 right-0 m-auto absolute flex justify-center text- dark:text-white pointer-events-none flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-3xl xl:text-6xl font-bold">
          Harmony in Thought, Document, and Purpose
          <br />
          Welcome to <span className="underline">Kami</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-base xl:text-2xl font-medium">
          Kami emerges as a sanctuary of <br />
          seamless collaboration and enhanced efficiency
        </h3>
        {isAuthenticated && !isLoading && (
          <button className="p-[3px] relative pointer-events-auto">
            <Link href="/documents">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BB97F3] to-[#F9C4C9] rounded-lg" />
              <div className="px-8 py-2 bg-transparent rounded-[6px] relative group transition duration-200 text-white hover:text-black font-bold hover:bg-white flex flex-row">
                Enter Kami&nbsp;
                <span className="hidden sm:block">&nbsp;&#11212;</span>
                <Sparkle className="sm:hidden h-5 w-5 pb-[0.15rem]" />
              </div>
            </Link>
          </button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <button className="p-[3px] relative pointer-events-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#BB97F3] to-[#F9C4C9] rounded-lg" />
              <div className="px-8 py-2 bg-transparent rounded-[6px] relative group transition duration-200 text-white hover:text-black font-bold hover:bg-white flex flex-row">
                Get Kami&nbsp;
                <span className="hidden sm:block">&nbsp;&#11212;</span>
                <Sparkle className="sm:hidden h-5 w-5 pb-[0.15rem]" />
              </div>
            </button>
          </SignInButton>
        )}
        {isLoading && <Spinner size="lg" />}
        <Heroes />
        <Footer />
      </div>
    </>
  );
};

export default Heading;
