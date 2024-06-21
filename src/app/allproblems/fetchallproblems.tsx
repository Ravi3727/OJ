import { ApiResponse } from "@/Types/ApiResponse";
import axios, { AxiosError } from "axios";
import React from "react";

export const fetchallproblems = async () => {
  try {
    const response = await axios.get("/api/getAllProblems");
    console.log("get all problems", response.data);
    return response.data.results;

  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    return (
      axiosError.response?.data.message ?? "Error on fetching all problems"
    );
  }
};
