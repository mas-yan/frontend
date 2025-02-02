import axios from 'axios';
import { Commission, Payment, CreatePaymentRequest, Sale } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCommissions = () => {
  return api.get<Commission[]>('/commissions');
};
export const getsales = () => {
  return api.get<Sale[]>('/sales');
};

export const getPayments = () => {
  return api.get<Payment[]>('/payments');
};

export const createPayment = (data: CreatePaymentRequest) => {
  return api.post<Payment>('/payments', data);
};

export const updatePaymentStatus = (id: number, status: string) => {
  return api.put(`/payments/${id}`, { status });
};

export const getPaymentsBySale = (saleId: number) => {
  return api.get<Payment[]>(`/sales/${saleId}/payments`);
};