"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Pin, PinOff, Sparkle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface MenuProps {
  id: Id<"documents">;
  documentId: Id<"documents">;
  initialData?: Doc<"documents">;
}

const Menu = ({ id, documentId, initialData }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const pin = useMutation(api.documents.pin);
  const unPin = useMutation(api.documents.unPin);

  const onPin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    // if (!id) return;
    const promise = pin({ id });

    toast.promise(promise, {
      loading: "Pinning Note to home... 🤏",
      success: "Note Pinned to home! 📌",
      error: "Failed to pin note. 🥺",
    });
  };

  const onUnpin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    // if (!id) return;
    const promise = unPin({ id });

    toast.promise(promise, {
      loading: "Unpinning Note from home... 🤏",
      success: "Note Unpinned from home! 🗞️",
      error: "Failed to unpin note. 🥺",
    });
  };

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash... 🗑️",
      success: "Note Moved to trash! 👋",
      error: "Failed to archive note. 🥺",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-7 animate-shimmer items-center dark:invert justify-center rounded-full bg-[linear-gradient(110deg,#000103,45%,#3C4C63,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transform ease-in-out duration-400">
          <p className="text-xs hidden sm:block">&#11212;&#11212;&#11212;</p>
          <Sparkle className="sm:hidden h-3 w-3 pb-[0.1rem]" />
          <Sparkle className="sm:hidden h-3 w-3 pb-[0.1rem]" />
          <Sparkle className="sm:hidden h-3 w-3 pb-[0.1rem]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        {initialData?._id && initialData?.isPinned ? (
          <DropdownMenuItem onClick={onUnpin} className="flex flex-row">
            <PinOff className="h-4 w-4 mr-2" />
            Unpin Note
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={onPin} className="flex flex-row">
            <Pin className="h-4 w-4 mr-2" />
            Pin Note
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
