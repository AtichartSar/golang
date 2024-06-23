import { Button, Dropdown, MenuProps, Space } from "antd";
import React from "react";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { reMoveToken } from "@/service/token";
import { useRouter } from "next/navigation";

type Props = {};

const DropDownHeader = (props: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    reMoveToken();
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Space onClick={handleLogout}>
          <LogoutOutlined />
          ออกจากระบบ
        </Space>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button icon={<DownOutlined />}>menu</Button>
    </Dropdown>
  );
};

export default DropDownHeader;
