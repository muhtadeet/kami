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
    "Seek the note, in corners deep,",
    "Flip through pages, secrets keep,",
    "Unveiling words, your mind shall roam,",
    "Discover tales that lead you home.",
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
