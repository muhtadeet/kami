"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { PanelLeftOpen } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";
import Comrade from "./comrade";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "usehooks-ts";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-slate-100 dark:bg-slate-900 px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2 bg-slate-100 dark:bg-slate-900">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          "bg-slate-100 dark:bg-slate-900 px-3 py-2 w-full flex items-center gap-x-4",
          isMobile && !isCollapsed && "hidden"
        )}
      >
        {isCollapsed && (
          <PanelLeftOpen
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground sm:hidden"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Comrade />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
