import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  collapsed: boolean;
};

const SiderLayout = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const handleMenuClick = (e: any) => {
    console.log(e.key);

    switch (e.key) {
      case "profile":
        router.prefetch("/profile");
        break;

      default:
        break;
    }
  };
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        onClick={handleMenuClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "profile",
            icon: <UserOutlined />,
            label: <Link href="/profile">profile</Link>,
          },
          {
            key: "menu2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "menu3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      />
    </Sider>
  );
};

export default SiderLayout;
