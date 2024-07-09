"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  ChevronRight,
  LucideIcon,
  Pin,
  PinOff,
  Plus,
  Sparkle,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  initialData?: Doc<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({
  id,
  initialData,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const pin = useMutation(api.documents.pin);
  const unPin = useMutation(api.documents.unPin);

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash... 🗑️",
      success: "Note Moved to trash! 👋",
      error: "Failed to archive note. 🥺",
    });
  };

  const onPin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = pin({ id });

    toast.promise(promise, {
      loading: "Pinning Note to home... 🤏",
      success: "Note Pinned to home! 📌",
      error: "Failed to pin note. 🥺",
    });
  };

  const onUnpin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = unPin({ id });

    toast.promise(promise, {
      loading: "Unpinning Note from home... 🤏",
      success: "Note Unpinned from home! 🗞️",
      error: "Failed to unpin note. 🥺",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note... 💭",
      success: "New note created! 🌟",
      error: "Failed to create a new note. 🥺",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onClick={onClick}
          role="button"
          style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
          className={cn(
            "group min-h-[27px] text-sm sm:text-xs py-3 sm:py-2 pr-2 w-full hover:bg-primary/5 rounded-lg flex items-center text-muted-foreground font-medium transition ease-in-out",
            active && "bg-primary/5 text-primary transition ease-in-out"
          )}
        >
          {!!id && (
            <div
              role="button"
              className={cn(
                "h-full rounded-sm hover:bg-slate-300 dark:hover:bg-slate-800 mr-1 transition ease-in-out"
              )}
              onClick={handleExpand}
            >
              <ChevronRight
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground/50 transition ease-in-out",
                  expanded && "rotate-90 transition ease-in-out"
                )}
              />
            </div>
          )}
          {documentIcon ? (
            <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
          ) : (
            <Icon className="shrink-0 h-[21px] w-[21px] sm:h-[18px] sm:w-[18px] mr-2 text-muted-foreground" />
          )}

          <span className="truncate">{label}</span>
          {isSearch && (
            <kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs flex flex-row">
                ⌘
                <span className="text-sm hidden sm:block -mt-[0.1rem]">
                  &#11212;K
                </span>
                <Sparkle className="sm:hidden h-3 w-3" />
                <p className="sm:hidden text-sm -mt-[0.15rem]">K</p>
              </span>
            </kbd>
          )}
          {!!id && (
            <div className="ml-auto flex items-center gap-x-2">
              <ContextMenuContent>
                <ContextMenuItem onClick={onArchive}>
                  <Trash2 className="h-4 w-4 text-muted-foreground mr-2 ml-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" />
                  Delete
                </ContextMenuItem>
                <ContextMenuItem onClick={onCreate}>
                  <Plus className="h-4 w-4 text-muted-foreground mr-2 ml-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" />
                  New sub-note
                </ContextMenuItem>
                {/* {initialData?.isPinned ? (

                <ContextMenuItem onClick={onPin}>
                  <Pin className="h-4 w-4 text-muted-foreground mr-2 ml-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" />
                  Pin Note
                </ContextMenuItem>
                ) : ( 
                <ContextMenuItem onClick={onUnpin}>
                  <PinOff className="h-4 w-4 text-muted-foreground mr-2 ml-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" />
                  Unpin Note
                </ContextMenuItem>

                )} */}
              </ContextMenuContent>
              <div
                role="button"
                onClick={onCreate}
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-full ml-auto mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition ease-in-out"
              >
                <Plus className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground transition ease-in-out" />
              </div>
              {/* {initialData?.isPinned ? (
              <div
                role="button"
                onClick={onPin}
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-full ml-auto mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition ease-in-out"
              >
                <Plus className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground transition ease-in-out" />{" "}
                Pin
              </div>
              ) : ( 
              <div
                role="button"
                onClick={onUnpin}
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-full ml-auto mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition ease-in-out"
              >
                <Plus className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground transition ease-in-out" />{" "}
                Unpin
              </div>
              )} */}
            </div>
          )}
        </div>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
