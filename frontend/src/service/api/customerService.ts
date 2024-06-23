import { axiosAuth } from "@/lib/axios/axiosAuht";
import {
  customerCreateReq,
  customerLogin,
} from "../models/customer/customerReq";
import { axiosGo } from "@/lib/axios/axios-go";
import { ICustomerItemUpdateReq } from "../models/customer/customerUpdateReq";

export const createCustomer = async (body: customerCreateReq) => {
  try {
    const res = await axiosAuth.post("/api/v1/customers", body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (id: String) => {
  try {
    const res = await axiosGo.get(`/api/v1/customers/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerList = async (params: any) => {
  try {
    const res = await axiosGo.get("/api/v1/customers", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (
  id: string,
  body: ICustomerItemUpdateReq
) => {
  try {
    const res = await axiosGo.patch(`/api/v1/customers/${id}`, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const res = await axiosGo.delete(`/api/v1/customers/${id}`);
    return res.data;
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
