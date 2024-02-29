import React from "react";
import Heading from "./_components/heading";
// import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center md:justify-normal text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
      </div>
    </div>
  );
};

export default LandingPage;
