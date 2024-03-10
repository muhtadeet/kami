"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronRight, LucideIcon, Plus, Sparkle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
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
          className="h-full rounded-sm hover:bg-slate-300 dark:hover:bg-slate-800 mr-1 transition ease-in-out"
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
          <div
            role="button"
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-full ml-auto mr-5 sm:mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={onArchive}
          >
            <Trash2 className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 h-full ml-auto mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition ease-in-out"
          >
            <Plus className="h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground transition ease-in-out" />
          </div>
        </div>
      )}
    </div>
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
