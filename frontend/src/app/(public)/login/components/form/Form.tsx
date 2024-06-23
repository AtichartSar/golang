import { login } from "@/service/api/customerService";
import { customerLogin } from "@/service/models/customer/customerReq";
import { setAccessToken } from "@/service/token";
import styled from "@emotion/styled";
import { Button, Form, Input, Row, Space, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const FormLogin = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (value: customerLogin) => {
    try {
      const res = await login(value);
      setAccessToken(res.data.access_token);
      router.push("/loan");
      message.success("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      message.error("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Form form={form} onFinish={handleSubmit} labelCol={{ span: "8" }}>
      <Form.Item
        name="email"
        label="อีเมล"
        rules={[{ required: true, message: "กรุณากรอกอีเมล", type: "email" }]}
      >
        <Input placeholder="อีเมล" />
      </Form.Item>
      <Form.Item
        name="password"
        label="รหัสผ่าน"
        rules={[{ required: true, message: "กรุณากรอกหัสผ่าน" }]}
      >
        <Input.Password placeholder="รหัสผ่าน" />
      </Form.Item>
      <Row justify="end">
        <a onClick={handleRegister}>สมัครสมาชิก</a>
      </Row>
      <Form.Item>
        <Row justify="center" gutter={[8, 8]}>
          <Space size={16}>
            <StyledButton type="primary" htmlType="submit">
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
