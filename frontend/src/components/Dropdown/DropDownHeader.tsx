'use client';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { reMoveToken } from '@/service/token';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

type Props = {};

const DropDownHeader = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    await Cookies.remove('access_token');
    setTimeout(() => {
      setLoading(false);
      router.refresh();
      router.push('/login');

      console.log('logout');
    }, 1000);

    // router.push('/logout');
    // router.refresh();

    console.log('logout');
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      onClick: () => {
        handleLogout();
      },
      label: (
        <Space>
          <LogoutOutlined />
          ออกจากระบบ
        </Space>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button loading={loading} icon={<DownOutlined />}>
        เมนู
      </Button>
    </Dropdown>
  );
};

export default DropDownHeader;
