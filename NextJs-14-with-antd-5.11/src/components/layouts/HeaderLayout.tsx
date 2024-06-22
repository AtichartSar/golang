import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";

type Props = {
  callbackCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
};

const HeaderLayout = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props.callbackCollapsed(!props.collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default HeaderLayout;
