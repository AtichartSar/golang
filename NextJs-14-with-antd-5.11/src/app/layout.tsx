import React from "react";

import "./globals.css";

import StyledComponentsRegistry from "../lib/AntdRegistry";
import { inter, noto } from "./fonts";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en" className={`${noto.variable} ${inter.variable}`}>
    <body>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
