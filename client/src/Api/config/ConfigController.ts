import { toast } from "react-toastify";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const fetchConfigData = async (id) => {
  try {
    const response = await axios.get(`${SERVER_API}/config/${id}`, {
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

export const updateConfigData = async (data: any) => {
  try {
    const response = await axios.post(`${SERVER_API}/config/update`, data, {
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
