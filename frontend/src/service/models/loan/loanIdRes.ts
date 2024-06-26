export interface ILoanIdRes {
  id: number;
  loanAmount: number;
  interestRate: number;
  createdAt: string;
  updatedAt: string;
  CustomerID: number;
  customer: Customer;
  Payments: Payment[];
}

export interface Customer {
  name: string;
  address: string;
  district: string;
  postcode: string;
  phone: string;
  email: string;
}

export interface Payment {
  id: number;
  paymentDate: string;
  paymentAmount: number;
  description: string;
  principalBalance: number;
  interestBalance: number;
}
