"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/utils/cn";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { FileIcon, Sparkle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import BlankPage from "../_components/blank-page";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HomePageProps {
  documentId?: Id<"documents">;
  // data?: Doc<"documents">;
}

const HomePage = ({ documentId }: HomePageProps) => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const params = useParams();

  const documents = useQuery(api.documents.getHome, {
    creationTime: documentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onCreate = () => {
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
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center space-y-12 xl:space-y-14 2xl:space-y-20"
      )}
    >
      <h2
        className={cn(
          "text-sm sm:text-2xl font-bold",
          documents && documents.length == 0 && "-mb-20"
        )}
      >
        Howdy, Hey {user?.firstName}! Welcome to your Kami! 🎉
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-7 sm:gap-x-16 sm:gap-y-14 xl:gap-x-24 xl:gap-y-20 ">
        {documents &&
          documents.slice(0, 8).map((document) => (
            <div key={document._id} className="gap-y-1 transition ease-in-out">
              <BlankPage
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={params.documentId === document._id}
                // level={level}
                // onExpand={() => {}}
                // expanded={false}
              />
            </div>
          ))}
      </div>
      {documents && documents.length == 0 && (
        <Image src="/newNote.png" height={300} width={300} alt="New Note" />
      )}
      {documents && documents.length == 0 ? (
        <button
          onClick={onCreate}
          className="p-[3px] relative pointer-events-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#BB97F3] to-[#F9C4C9] rounded-lg" />
          <div className="px-3 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-white hover:text-black font-bold hover:bg-white flex flex-row">
            Let&apos;s Create a new note&nbsp;
            <span className="hidden sm:block">&nbsp;&#11212;</span>
            <Sparkle className="sm:hidden h-4 w-4 pt-[0.1rem]" />
          </div>
        </button>
      ) : (
        <button
          onClick={onCreate}
          className="p-[3px] absolute right-14 bottom-20 sm:right-auto sm:bottom-auto sm:relative pointer-events-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#BB97F3] to-[#F9C4C9] rounded-lg" />
          <div className="px-3 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-white hover:text-black font-bold hover:bg-white flex flex-row">
            <p className="hidden sm:block">Let&apos;s Create a new note&nbsp;</p>
            <span className="hidden sm:block">&#11212;</span>
            <Sparkle className="sm:hidden h-4 w-4 pt-[0.1rem]" />
          </div>
        </button>
      )}
    </div>
  );
};

export default HomePage;
