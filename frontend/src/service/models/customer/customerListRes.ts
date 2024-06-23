import { IPaging } from "../paging";
import { Loan } from "../payment/paymentIdRes";

export interface ICustomerListRes {
  data: ICustomerTable;
}

export interface ICustomerTable {
  items: ICustomerItem[];
  paging: IPaging;
}

export interface ICustomerItem {
  id: number;
  name: string;
  address: string;
  district: string;
  postcode: string;
  phone: string;
  email: string;
  loans: Loan[];
}
