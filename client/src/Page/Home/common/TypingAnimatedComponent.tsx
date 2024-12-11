import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const AnimatedComponent = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowLogo(true);
    }, 3500);

    const timer2 = setTimeout(() => {
      setShowTagline(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div>
      <div className="d-flex align-items-baseline justify-content-center justify-content-md-start">

        <h1 className="text-blue-950 font-extrabold text-4xl md:text-6xl mb-4">
          <Typewriter
            words={["QuickTix.com"]}
            loop={1}
            cursor={cursorVisible}
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={() => {
              setShowLogo(true);
              setCursorVisible(false);
            }}
          />
        </h1>
      </div>
      {showTagline && (
        <h2 className="text-black font-semibold text-lg md:text-2xl mb-6">
          <Typewriter
            words={[
              "Seamless Ticketing for Every Adventure Awaiting You.",
            ]}
            loop={1}
            cursor={cursorVisible}
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={() => {
              setShowLogo(true);
              setCursorVisible(false);
            }}
          />
        </h2>
      )}
    </div>
  );
};

export default AnimatedComponent;
