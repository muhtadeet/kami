"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import React, { useState } from "react";
import HomePage from "../../_components/home-page";

const DocumentsPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-20">
      <HomePage />
    </div>
  );
};

export default DocumentsPage;
