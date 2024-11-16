import React, { useEffect } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context";
import { AUTHPAGE, DASHBOARD } from "../../Constant";

export const Loginsuccess = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate(`../${DASHBOARD}`);
        return () => clearTimeout(timer);
      } else {
        navigate(`../${AUTHPAGE}`);
      }
    }, 1500);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-300">
      <Spin
        size="default"
        tip="You have successfully logged in. Please wait while we redirect you to your dashboard."
      />
    </div>
  );
};
