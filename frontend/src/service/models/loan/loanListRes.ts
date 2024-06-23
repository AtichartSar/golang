import { IPaging } from "../paging";

export interface LoanListRes {
  data: ILoanTable;
}

export interface ILoanTable {
  items: ILoanItem[];
  paging: IPaging;
}

export interface ILoanItem {
  id: number;
  loanAmount: number;
  interestRate: number;
  createdAt: string;
  updatedAt: string;
  CustomerID: number;
  customer: Customer;
  Payments: any[];
}

export interface Customer {
  name: string;
  address: string;
  district: string;
  postcode: string;
  phone: string;
  email: string;
}
