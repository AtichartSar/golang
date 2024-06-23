"use client";
import { Layout } from "antd";
import { ReactNode, useState } from "react";
import ContentLayout from "./ContentLayout";
import HeaderLayout from "./HeaderLayout";
import SiderLayout from "./SiderLayout";

type Props = {
  children: ReactNode;
};
const LayoutClient = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ flexDirection: "row", minHeight: "100vh" }}>
      <SiderLayout collapsed={collapsed} />
      <Layout>
        <HeaderLayout callbackCollapsed={setCollapsed} collapsed={collapsed} />
        <ContentLayout>{children}</ContentLayout>
      </Layout>
    </Layout>
  );
};

export default LayoutClient;
