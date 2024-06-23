export interface customerCreateReq {
  name: string;
  address: string;
  district: string;
  postcode: string;
  phone: string;
  email: string;
  password: string;
}

export interface customerUpdateReq {
  name: string;
  address: string;
  district: string;
  postcode: string;
  phone: string;
}

export interface customerLogin {
  email: string;
  password: string;
}
