"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";
import { ChevronsLeftRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserItem = () => {
  const { user } = useUser();

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <div
    //       role="button"
    //       className="flex items-center text-sm p-4 pt-6 pl-3 w-full hover:bg-primary/5"
    //     >
    //       <div className="gap-x-2 flex items-center max-w-[150px]">
    //         <Avatar className="h-5 w-5">
    //           <AvatarImage src={user?.imageUrl} />
    //         </Avatar>
    //         <span className="text-start font-semibold line-clamp-1">
    //           {user?.firstName}&apos;s Kami
    //         </span>
    //       </div>
    //       <ChevronsLeftRightIcon className="rotate-90 ml-5 text-muted-foreground h-4 w-4" />
    //     </div>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className="w-80"
    //     align="start"
    //     alignOffset={11}
    //     forceMount
    //   >
    //     <div className="flex flex-col space-y-4 p-2">
    //       {/* <p className="text-xs font-medium leading-none text-muted-foreground">
    //         {user?.emailAddresses[0].emailAddress}
    //       </p> */}
    //       <div className="flex items-center gap-x-2">
    //         <div className="rounded-full bg-secondary p-1">
    //           <Avatar>
    //             <AvatarImage src={user?.imageUrl} />
    //           </Avatar>
    //         </div>
    //         <div className="space-y-1 flex flex-row space-x-1 items-center">
    //           <p className="text-sm line-clamp-1">
    //             {user?.emailAddresses[0].emailAddress}
    //           </p>
    //           {/* <span className="pl-2">
    //             <ModeToggle />
    //           </span> */}
    //         </div>
    //       </div>
    //     </div>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       asChild
    //       className="w-full cursor-pointer text-muted-foreground"
    //     >
    //       <Link href="/">
    //         <button className="hover:border-none">Home</button>
    //       </Link>
    //     </DropdownMenuItem>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       asChild
    //       className="w-full cursor-pointer text-muted-foreground"
    //     >
    //       <SignOutButton>Sign Out</SignOutButton>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <>
      <div className="flex flex-row items-center my-2">
        <span className="p-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              baseTheme: shadesOfPurple,
            }}
          />
        </span>
        <p className="font-semibold dark:invert inline-flex h-7 animate-shimmer2 text-base items-center justify-center rounded-full bg-[linear-gradient(110deg,#000103,45%,#3C4C63,55%,#000103)] bg-[length:200%_100%] px-1 text-transparent transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform ease-in-out duration-400 bg-clip-text">
          {user?.firstName}&apos;s Kami
        </p>
      </div>
    </>
  );
};

export default UserItem;
