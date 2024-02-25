import { cn } from "@/lib/utils";
import { Reem_Kufi } from "next/font/google";
import Image from "next/image";
import React from "react";

const reem = Reem_Kufi({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image src="/kamiLogo.svg" alt="Kami Logo" height={40} width={40} />
      <p className={cn("font-semibold", reem.className)}>Kami</p>
    </div>
  );
};

export default Logo;
