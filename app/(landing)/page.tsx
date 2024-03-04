"use client";

import React from "react";
import Heading from "./_components/heading";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";

const LandingPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    router.push("/documents");
  }

  return (
    <div className="min-h-full flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center md:justify-normal text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default LandingPage;
