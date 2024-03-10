"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  FilePlus2,
  PanelLeftOpen,
  Plus,
  Search,
  Settings2,
  Trash2,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
// import Item from "./item";
import { toast } from "sonner";
// import DocumentList from "./document-list";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import Navbar from "./navbar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings } from "@/components/modals/settings";
import dynamic from "next/dynamic";

const DocumentList = dynamic(() => import("./document-list"));
const Item = dynamic(() => import("./item"));

const Navigation = () => {
  const search = useSearch();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      resetWidth();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note... 💭",
      success: "New note created! 🌟",
      error: "Failed to create a new note. 🥺",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-screen bg-primary/5 dark:bg-slate-800/70 overflow-hidden relative flex w-60 flex-col z-[9]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-6 right-6 opacity-0 group-hover/sidebar:opacity-100 transition ease-in-out sm:hidden",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div className="mx-2">
          <UserItem />
          <span className="flex justify-center items-center">
            <Separator className="bg-muted-foreground/20 my-2 mb-4 w-[95%] sm:w-48" />
          </span>
          <span className="flex flex-col gap-y-1 sm:gap-y-0">
            <Item
              label="Search"
              icon={Search}
              isSearch
              onClick={search.onOpen}
            />
            <Drawer>
              <DrawerTrigger>
                <Item label="Settings" icon={Settings2} />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="border-b pb-5 flex justify-center">
                  <DrawerTitle>
                    <h2 className="text-2xl font-medium">Settings</h2>
                  </DrawerTitle>
                </DrawerHeader>
                <Settings />
              </DrawerContent>
            </Drawer>
            <Item onClick={handleCreate} label="New Page" icon={FilePlus2} />
          </span>
          <span className="flex justify-center items-center">
            <Separator className="bg-muted-foreground/20 my-2 mb-0 mt-4 w-[95%] sm:w-48" />
          </span>
        </div>
        <div className="mt-4 mx-2">
          <span className="flex flex-col gap-y-3">
            <ScrollArea className="h-72 sm:h-72 md:h-40 xl:h-72">
              <DocumentList />
            </ScrollArea>
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          </span>
          <span className="flex justify-center items-center">
            <Separator className="bg-muted-foreground/20 my-2 mb-0 mt-4 w-[95%] sm:w-48" />
          </span>
          <Drawer>
            <DrawerTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash2} />
            </DrawerTrigger>
            <DrawerContent className="z-[99999999]">
              <TrashBox />
            </DrawerContent>
          </Drawer>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <PanelLeftOpen
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
