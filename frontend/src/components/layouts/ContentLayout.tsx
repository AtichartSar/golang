import { noto } from "@/app/fonts";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContentLayout = ({ children }: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      className={noto.className}
    >
      {children}
    </Content>
  );
};

export default ContentLayout;
