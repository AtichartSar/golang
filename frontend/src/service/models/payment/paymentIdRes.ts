export interface IPaymentIdRes {
  data: IPaymentIdData;
}

export interface IPaymentIdData {
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
