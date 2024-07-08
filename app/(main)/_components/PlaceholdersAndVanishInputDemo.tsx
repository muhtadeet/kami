"use client";

import { useSearch } from "@/hooks/use-search";
import { PlaceholdersAndVanishInput } from "../../../components/ui/placeholders-and-vanish-input";

interface PlaceholdersAndVanishInputDemoProps {
  onClick: () => void;
}

export function PlaceholdersAndVanishInputDemo({
  onClick,
}: PlaceholdersAndVanishInputDemoProps) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className=" flex flex-col px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
