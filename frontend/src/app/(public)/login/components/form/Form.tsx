import { getPermission } from '@/config/permission';
import { validateAndGetTokenPayload } from '@/middleware';
import { login } from '@/service/api/customerService';
import { customerLogin } from '@/service/models/customer/customerReq';
import { setAccessToken } from '@/service/token';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, Input, Row, Space, message } from 'antd';
import { setCookie } from 'cookies-next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {};

const FormLogin = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (value: customerLogin) => {
    try {
      setLoading(true);
      const res = await login(value);
      setAccessToken(res.data.access_token);
      setCookie('access_token', res.data.access_token);

      await Cookies.set('access_token', res.data.access_token);

      setTimeout(() => {
        router.refresh();
        message.success('เข้าสู่ระบบสำเร็จ');
        const payload = validateAndGetTokenPayload(res.data.access_token);
        router.push(getPermission[payload.role].defaultPath);
      }, 1000);
    } catch (error) {
      setLoading(false);
      message.error('เข้าสู่ระบบไม่สำเร็จ');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <Form form={form} onFinish={handleSubmit} labelCol={{ span: '4' }}>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'กรุณากรอกอีเมล', type: 'email' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='อีเมล' />
        {/* <Input placeholder="อีเมล" /> */}
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: 'กรุณากรอกหัสผ่าน' }]}>
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='รหัสผ่าน'
        />
      </Form.Item>
      <Row justify='end'>
        <a onClick={handleRegister}>สมัครสมาชิก</a>
      </Row>
      <Form.Item>
        <Row justify='center' gutter={[8, 8]}>
          <Space size={16}>
            <StyledButton loading={loading} type='primary' htmlType='submit'>
              เข้าสู่ระบบ
            </StyledButton>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;

const StyledButton = styled(Button)`
  width: 100px;
`;
