import React from "react";
// import Navbar from "./_components/navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./_components/navbar"));

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <BackgroundGradientAnimation className="pointer-events-auto">
        <Navbar />
        <main className="h-full pt-40">{children}</main>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default LandingLayout;
