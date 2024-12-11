import React, { useEffect } from "react";
import { useAuthContext } from "../../Context";
import { AUTHPAGE, HOMEPAGEURL, UserRolesEnum } from "../../Constant";
import { VendorDashboard } from "./Vendor/VendorDashboard";
import { CustomerDashboard } from "./Customer/CustomerDashboard";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { user, isAuthenticated, isActive } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`../${AUTHPAGE}`);
    }

    if (!isActive && user.userRole !== UserRolesEnum.admin) {
      navigate(`../${HOMEPAGEURL}`);
      toast.warn("The system is temporarily inactive.");
    }
  }, [isAuthenticated, navigate, isActive]);

  return (
    <>
      {user && user.userRole === UserRolesEnum.admin ? (
        <AdminDashboard />
      ) : user && user.userRole === UserRolesEnum.vendor ? (
        <VendorDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </>
  );
};
