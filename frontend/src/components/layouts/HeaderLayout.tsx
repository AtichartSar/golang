import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Row, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import DropDownHeader from "../Dropdown/DropDownHeader";

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
      <Row
        align="middle"
        justify="space-between"
        style={{ paddingRight: "16px" }}
      >
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
        <DropDownHeader />
      </Row>
    </Header>
  );
};

export default HeaderLayout;
