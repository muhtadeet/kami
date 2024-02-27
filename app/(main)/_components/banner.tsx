"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note... ⚙️",
      success: "Note deleted! 🎈",
      error: "Failed to delete note. 🥺",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note... ❤️‍🩹",
      success: "Note restored! 🎆",
      error: "Failed to restore note. 🥺",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash</p>
      <button
        onClick={onRestore}
        className="px-4 py-2 backdrop-blur-sm rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.3] border-2 border-transparent hover:border-white/[0.3] text-sm transition ease-in-out duration-200"
      >
        Restore Page
      </button>
      <ConfirmModal onConfirm={onRemove}>
        <button className="px-4 py-2 backdrop-blur-sm rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.3] text-sm border-2 border-transparent hover:border-white/[0.3] transition ease-in-out duration-200">
          Delete Forever
        </button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
