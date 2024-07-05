export const percent = (value: string): string => `${value}%`;

export const currency = (value: string): string => `
 ${Number(value).toLocaleString('en-US', {
   minimumFractionDigits: 2,
   maximumFractionDigits: 2,
 })} บาท`;
