import React, { useEffect } from "react";
import { useAuthContext } from "../../Context";
import { AUTHPAGE, UserRolesEnum } from "../../Constant";
import { VendorDashboard } from "./Vendor/VendorDashboard";
import { CustomerDashboard } from "./Customer/CustomerDashboard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`../${AUTHPAGE}`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {user && user?.userRole === UserRolesEnum.vendor ? (
        <VendorDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
};
