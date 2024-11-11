import { scrollToTop } from "../../Lib/Utils";
import { RocketFilled } from "@ant-design/icons";
import React, { useState } from "react";

export const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisibility);

  return (
    <div
      className={`scroll-up-btn ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <RocketFilled className="text-blue-950" style={{fontSize:'4rem'}}/>
    </div>
  );
};


