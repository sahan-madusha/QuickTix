import { toast } from "react-toastify";
import { SERVER_API } from "../../../src/Constant";
import axios from "axios";

export const AddUpdateEventData = async (data: any) => {
  try {
    const response = await axios.post(`${SERVER_API}/ticket/add`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(errorMessage);
  }
};


export const TicketPurchase  = async (data: any) => {
  try {
    const response = await axios.post(`${SERVER_API}/ticket/purchase`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(errorMessage);
  }
};