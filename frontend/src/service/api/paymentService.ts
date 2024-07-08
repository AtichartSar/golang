import { axiosGo } from '@/lib/axios/axios-go';
import { IPaymentCreateReq } from '../models/payment/paymentCreateReq';
import { IPaymentUpdateReq } from '../models/payment/paymentUpdateReq';

export const getPayment = async (id: string) => {
  try {
    const res = await axiosGo.get(`/api/v1/payments/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentList = async (params: any) => {
  try {
    const res = await axiosGo.get('/api/v1/payments', { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async (body: IPaymentCreateReq) => {
  try {
    const res = await axiosGo.post('/api/v1/payments', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updatePayment = async (id: string, body: IPaymentUpdateReq) => {
  try {
    const res = await axiosGo.patch(`/api/v1/payments/${id}`, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};
