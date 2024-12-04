import { toast } from "react-toastify";
import { SERVER_API } from "../../Constant";
import axios from "axios";

export const getAllLogs = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/getsystemlogs`);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };
  