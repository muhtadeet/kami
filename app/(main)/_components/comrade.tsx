import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Comrade = () => {
  return (
    <div className="-ml-2">
      <Button size="sm" variant="ghost">
        <a href="https://comrade-flame.vercel.app/" target="_blank" className="flex flex-row">
          <p className=" inline-flex h-7 animate-shimmer2 text-lg items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 from-15% to-red-400 to-90% bg-[length:200%_100%] px-1 font-bold text-transparent transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform ease-in-out duration-400 bg-clip-text">
            Ask
          </p>
          <Image
            src="/comrade.png"
            alt="Comrade Logo"
            width={20}
            height={20}
            className="h-7 w-7"
          />
        </a>
      </Button>
    </div>
  );
};

export default Comrade;
