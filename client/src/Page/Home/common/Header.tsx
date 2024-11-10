import React from "react";
import { IMAGE_URL } from "../../../../src/Constant";
import AnimatedComponent from "./TypingAnimatedComponent";

export const Header = () => {
  return (
    <>
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white text-center p-4"
        style={{ backgroundImage: `url(${IMAGE_URL}/herosectionimage.svg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-pink-200 to-sky-200 opacity-50"></div>

        <div className="flex font-bold flex-col items-center text-center p-8 rounded-lg z-20">
          <AnimatedComponent />
        </div>
      </section>
    </>
  );
};
