import { Button, Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { reMoveToken } from '@/service/token';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

type Props = {};

const DropDownHeader = (props: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    reMoveToken();
    router.push('/login');
    deleteCookie('access_token');
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
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
      <Button icon={<DownOutlined />}>เมนู</Button>
    </Dropdown>
  );
};

export default DropDownHeader;
