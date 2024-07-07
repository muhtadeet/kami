"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

interface BlankPageProps {
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

export const BlankPage = ({
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
}: BlankPageProps) => {
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
    <Card className="border-muted-foreground border-2 border-dashed rounded-xl ">
      <div
        onClick={onClick}
        role="button"
        className={cn(
          "group min-h-[27px] w-40 sm:w-48 xl:w-64 hover:bg-primary/5 dark:hover:bg-slate-900 dark:bg-[#1F1F1F] rounded-xl flex flex-col items-start gap-1 sm:gap-2 xl:gap-4 text-xl text-muted-foreground font-semibold transition-all ease-in-out",
          active && "bg-primary/5 text-primary transition ease-in-out"
        )}
      >
        <CardHeader>
          {documentIcon ? (
            <div className=" text-[18px]">{documentIcon}</div>
          ) : (
            <Icon className="h-[21px] w-[21px] sm:h-[18px] sm:w-[18px] mr-2 text-muted-foreground" />
          )}
        </CardHeader>
        <CardContent>
          <span className="truncate">{label}</span>
        </CardContent>
      </div>
    </Card>
  );
};

BlankPage.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
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

export default BlankPage;
