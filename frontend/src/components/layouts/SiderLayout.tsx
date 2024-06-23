import {
  UserOutlined,
  BankOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

  const path = usePathname();
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        onClick={handleMenuClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[path]}
        items={[
          {
            key: "/loan",
            icon: <BankOutlined />,
            label: <Link href="/loan">loan</Link>,
          },
          {
            key: "/customer",
            icon: <UserOutlined />,
            label: <Link href="/customer">customer</Link>,
          },
          {
            key: "/payment",
            icon: <CreditCardOutlined />,
            label: <Link href="/payment">payment</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default SiderLayout;
