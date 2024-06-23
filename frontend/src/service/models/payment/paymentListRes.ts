import { IPaging } from "../paging";

export interface IPaymentRes {
  data: IPaymentTable;
}

export interface IPaymentTable {
  items: IPaymentItem[];
  paging: IPaging;
}

export interface IPaymentItem {
  id: number;
  paymentDate: string;
  paymentAmount: number;
  description: string;
  principalBalance: number;
  interestBalance: number;
  LoanID: number;
  loan: Loan;
}

export interface Loan {
  id: number;
  loanAmount: number;
  interestRate: number;
  createdAt: string;
  updatedAt: string;
}
