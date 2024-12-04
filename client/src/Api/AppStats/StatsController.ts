import { toast } from "react-toastify";
import { SERVER_API } from "../../../src/Constant";
import axios from "axios";

export const GetAppStats = async () => {
  try {
    const response = await axios.get(`${SERVER_API}/stats`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";
    toast.error(errorMessage);
  }
};
