import React from "react";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="flex justify-center pt-24 text-sm sm:text-base md:text-sm xl:text-base sm:pt-0 items-center w-full p-6 md:pb-20 xl:pb-10 z-50">
      <div className="sm:hidden">
        <Logo />
      </div>
      &nbsp; <p className="hidden sm:block">Kami&nbsp;</p>&nbsp;|&nbsp;&nbsp;<p className="sm:hidden">&nbsp;</p>Mustakim Islam Alif
    </div>
  );
};

export default Footer;
