import { axiosAuth } from "@/lib/axios/axiosAuht";
import {
  customerCreateReq,
  customerLogin,
  customerUpdateReq,
} from "../models/customer/customerReq";

export const createCustomer = async (body: customerCreateReq) => {
  try {
    const res = await axiosAuth.post("/api/v1/customers", body);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (id: String) => {
  try {
    const res = await axiosAuth.get(`/api/v1/customers/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCustomerList = () => {
  try {
    const res = axiosAuth.get("/api/v1/customers");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = (body: customerUpdateReq) => {
  try {
    const res = axiosAuth.put("/api/v1/customers", body);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = (id: string) => {
  try {
    const res = axiosAuth.delete(`/api/v1/customers/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export const login = async (body: customerLogin) => {
  try {
    const res = await axiosAuth.post("/api/v1/customers/login", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};
