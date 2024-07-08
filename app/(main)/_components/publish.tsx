"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Check, CheckCheckIcon, Copy, Globe2 } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import Example from "./colab";
import EncryptButton from "./colab";
interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editability, seteditability] = useState(false);
  const [text, setText] = useState(
    initialData.isEditable ? "Collabed!" : "Collab!"
  );

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing... 🗺️",
      success: "Note published! 🌎",
      error: "Failed to publish note. 🥺",
    });
  };

  const onPermitting = () => {
    setIsSubmitting(true);
    setText("Collabed!");

    const promise = update({
      id: initialData._id,
      isEditable: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Enabling Collaboration... ⛵",
      success: "Opened doors of Collaboration! 🤝",
      error: "Failed to Enable Editability. 🥺",
    });
  };

  const onRejecting = () => {
    setIsSubmitting(true);
    setText("Collab!");

    const promise = update({
      id: initialData._id,
      isEditable: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Disabling Collaboration... ⛵",
      success: "Closed doors of Collaboration! 👎",
      error: "Failed to Enable Editability. 🥺",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing... 🔃",
      success: "Note unpublished! 🎁",
      error: "Failed to unpublish note. 🥺",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Share
          {initialData.isPublished && (
            <Globe2 className="text-sky-500 font-semibold animate-pulse w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe2 className="text-sky-500 font-semibold animate-pulse h-5 w-5" />
              <p className="text-xs font-semibold text-sky-500">
                The note is live!
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 py-5 text-sm border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none py-5 hover:bg-slate-300 hover:text-black transition ease-in-out dark:hover:bg-slate-700 dark:hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <EncryptButton
              TARGET_TEXT={text}
              disabled={isSubmitting}
              onClick={
                editability == initialData.isEditable
                  ? onPermitting
                  : onRejecting
              }
            />
            {/* <p className="text-white">{initialData.isPinned && "hehe"}</p> */}
            <Button
              size="sm"
              className="w-full text-xs px-4 py-2 rounded-md border dark:border-white font-semibold dark:bg-white dark:hover:bg-slate-700 dark:hover:text-white border-black hover:bg-white bg-black hover:text-slate-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition ease-in-out duration-200"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe2 className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs px-4 py-2 rounded-md border dark:border-white dark:bg-white dark:hover:bg-slate-700 dark:hover:text-white border-black hover:bg-white bg-black hover:text-slate-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition ease-in-out duration-200"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
