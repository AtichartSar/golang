import { axiosGo } from "@/lib/axios/axios-go";
import { loanCreateReq } from "../models/loan/loanReq";

export const createLoan = async (body: loanCreateReq) => {
  try {
    const res = await axiosGo.post("/api/v1/loans", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getLoan = async (id: string) => {
  try {
    const res = await axiosGo.get(`/api/v1/loans/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getLoanList = async (params: any) => {
  try {
    const res = await axiosGo.get("/api/v1/loans", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateLoan = async (id: string, body: any) => {
  try {
    const res = await axiosGo.patch(`/api/v1/loans/${id}`, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLoan = async (id: string) => {
  try {
    const res = await axiosGo.delete(`/api/v1/loans/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
