import { getPermission } from '@/config/permission';
import { deCodeToken } from '@/service/token';
import { UserOutlined, BankOutlined, CreditCardOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Menu from 'antd/es/menu';
import { getCookie } from 'cookies-next';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  collapsed: boolean;
};

const SiderLayout = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    {
      key: '/loan',
      icon: <BankOutlined />,
      label: <Link href='/loan'>เงินกู้</Link>,
    },
    {
      key: '/customer',
      icon: <UserOutlined />,
      label: <Link href='/customer'>ลูกค้า</Link>,
    },
    {
      key: '/payment',
      icon: <CreditCardOutlined />,
      label: <Link href='/payment'>การชำระเงิน</Link>,
    },
    {
      key: '/customer/loan',
      icon: <BankOutlined />,
      label: <Link href='/customer/loan'>loan</Link>,
    },
  ];

  const [menus, setMenus] = useState([]);
  const token = getCookie('access_token');
  useEffect(() => {
    if (token) {
      const decode = deCodeToken(token);
      const filteredMenu = items.filter((item) =>
        getPermission[decode.payload.role].menu.includes(item.key)
      );
      setMenus(filteredMenu);
    }
  }, [token]);

  const path = usePathname();
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className='demo-logo-vertical' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={[path]} items={menus} />
    </Sider>
  );
};

export default SiderLayout;
