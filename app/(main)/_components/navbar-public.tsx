"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title-public";
import Banner from "./banner";
import Menu from "./menu-public";

interface NavbarProps {
  preview?: boolean;
}

const Navbar = ({ preview }: NavbarProps) => {
  const params = useParams();

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
      <nav className="bg-slate-100 dark:bg-slate-900 px-3 py-2 w-full flex items-center gap-x-4">
        <div className="flex items-center justify-between w-full">
          <Title preview initialData={document} />
          <div className="flex items-center gap-x-2">
            <Menu />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
