"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/error2.png" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-bold">Something Went Wrong!</h2>

      <Button
        asChild
        className="px-4 py-2 rounded-md border dark:border-white dark:bg-white dark:hover:bg-slate-700 dark:hover:text-white border-black hover:bg-white bg-black hover:text-slate-700 text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition ease-in-out duration-200"
      >
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
