import { toast } from "react-toastify";
import { SERVER_API } from "../../../src/Constant";
import axios from "axios";

interface EventData {
  name: string;
  location: string;
  date: string;
  time: string;
  description: string;
  image?: any;
  status?: any;
}

export const AddEventData = async (data: EventData) => {
  try {
    const response = await axios.post(`${SERVER_API}/event/add`, data, {
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