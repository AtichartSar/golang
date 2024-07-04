export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum PageRoute {
  CUSTOMER = '/customer',
  LOAN = '/loan',
  PAYMENT = '/payment',
  CUSTOMER_LOAN = '/customer/loan',
  CUSTOMER_PAYMENT = '/customer/payment',
  LOGIN = '/login',
  REGISTER = '/register',
}

export const getPrivateRoute = [
  PageRoute.CUSTOMER,
  PageRoute.LOAN,
  PageRoute.PAYMENT,
  PageRoute.CUSTOMER_LOAN,
  PageRoute.CUSTOMER_PAYMENT,
];

export const publicRoute = [PageRoute.LOGIN, PageRoute.REGISTER];

export const getPermission = {
  [Role.CUSTOMER]: {
    menu: [PageRoute.CUSTOMER_LOAN, PageRoute.CUSTOMER_PAYMENT],
    defaultPath: PageRoute.CUSTOMER_LOAN,
  },
  [Role.ADMIN]: {
    menu: [PageRoute.CUSTOMER, PageRoute.LOAN, PageRoute.PAYMENT],
    defaultPath: PageRoute.CUSTOMER,
  },
};
