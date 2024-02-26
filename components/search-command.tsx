"use client";

import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery();

  return <div></div>;
};

export default SearchCommand;
