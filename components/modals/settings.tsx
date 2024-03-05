"use client";

import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Send } from "lucide-react";

const mail = "muhtadeetaron@gmail.com";

export const Settings = () => {
  return (
    <>
      <div className="flex items-center justify-between z-[999999] p-8 sm:px-80 md:px-40 xl:px-80">
        <div className="flex flex-col gap-y-1">
          <Label className="text-lg">Appearance</Label>
          <span className="text-[0.8rem] text-muted-foreground">
            Customize how Kami looks on your device
          </span>
        </div>
        <ModeToggle />
      </div>
      <div className="flex items-center justify-between p-8 sm:px-80 md:px-40 xl:px-80">
        <div className="flex flex-col gap-y-1">
          <Label className="text-lg">Facing any issue?</Label>
          <span className="text-[0.8rem] text-muted-foreground">
            Feel drop by! I&apos;m always happy to help!
          </span>
        </div>
        <a href={`mailto:${mail}`} className="mr-2">
          <Send />
        </a>
      </div>
      <div className="flex justify-center items-center mt-2 p-8 pt-3">
        <Link
          href="https://github.com/muhtadeet/kami/releases/download/Kami/Kami-The.ultimate.note.app-v1.4.apk"
          target="_blank"
        >
          <button className="inline-flex h-7 animate-shimmer items-center justify-center rounded-full bg-[linear-gradient(110deg,#000103,45%,#3C4C63,55%,#000103)] bg-[length:200%_100%] px-4 py-6 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform ease-in-out duration-400">
            <p className="text-base block">Try Kami on Android!</p>
          </button>
        </Link>
      </div>
    </>
  );
};
