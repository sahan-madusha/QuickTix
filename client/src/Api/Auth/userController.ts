import { toast } from "react-toastify";
import { SERVER_API } from "../../../src/Constant";
import axios from "axios";

export const signIn = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${SERVER_API}/auth/signin`, data, {
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

export const signUp = async (data:any) => {
  try {
    const response = await axios.post(`${SERVER_API}/auth/signup`, data, {
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