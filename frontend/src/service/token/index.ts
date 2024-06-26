import { jwtDecode } from 'jwt-decode';

const TOKEN = 'accessToken';

export const getAccessToken = (): string => {
  const token = localStorage.getItem(TOKEN);
  return token;
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(TOKEN, token);
};

export const reMoveToken = (): void => {
  localStorage.removeItem(TOKEN);
};

export const deCodeToken = (token: any): any => {
  return jwtDecode(token);
};
