import LayoutClient from "@/components/layouts";
import styled from "@emotion/styled";
import React from "react";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="center">{children}</div>;
};

export default RootLayout;
