"use client";
import { api } from "@/convex/_generated/api";
import { cn } from "@/utils/cn";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

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
        "h-full flex flex-col items-center justify-center space-y-4"
      )}
    >
      <Image src="/newNote.png" height={300} width={300} alt="New Note" />
      <h2 className="text-base sm:text-lg font-bold">
        Howdy, Hey {user?.firstName}! Welcome to your Kami!
      </h2>
      <button
        onClick={onCreate}
        className="p-[3px] relative pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#BB97F3] to-[#F9C4C9] rounded-lg" />
        <div className="px-3 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-white hover:text-black font-bold hover:bg-white flex flex-row">
          Let&apos;s Create a note&nbsp;
          <span className="hidden sm:block">&nbsp;&#11212;</span>
          <Sparkle className="sm:hidden h-4 w-4 pt-[0.1rem]" />
        </div>
      </button>
    </div>
  );
};

export default DocumentsPage;
