"use client";

import React, { useEffect } from "react";
import { Button, Form, Input, Row, Space, message } from "antd";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { customerCreateReq } from "@/service/models/customer/customerReq";
import { createCustomer } from "@/service/api/customerService";

type Props = {};

const FormRegister = (props: Props) => {
  const [form] = Form.useForm();
  const route = useRouter();

  const handleSubmit = async (value: customerCreateReq) => {
    try {
      await createCustomer(value);
      message.success("สมัครสมาชิกสำเร็จ");
      route.push("/login");
    } catch (error) {
      message.error("สมัครสมาชิกไม่สำเร็จ");
    }
  };

  const handleCancel = () => {
    route.push("/login");
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="ชื่อ"
        rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
      >
        <Input placeholder="ชื่อ" />
      </Form.Item>
      <Form.Item
        name="address"
        label="ที่อยู่"
        rules={[{ required: true, message: "กรุณากรอกที่อยู่" }]}
      >
        <Input placeholder="ที่อยู่" />
      </Form.Item>
      <Form.Item
        name="district"
        label="ตำบล"
        rules={[{ required: true, message: "กรุณากรอกตำบล" }]}
      >
        <Input placeholder="ตำบล" />
      </Form.Item>
      <Form.Item
        name="postcode"
        label="ไปรษณีย์"
        rules={[{ required: true, message: "กรุณากรอกหัสไปรษณีย์" }]}
      >
        <Input placeholder="ไปรษณีย์" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="เบอร์โทรศัพท์"
        rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
      >
        <Input placeholder="เบอร์โทรศัพท์" />
      </Form.Item>
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
      <Form.Item>
        <Row justify="center" gutter={[8, 8]}>
          <Space size={16}>
            <StyledButton type="default" onClick={handleCancel}>
              ยกเลิก
            </StyledButton>
            <StyledButton type="primary" htmlType="submit">
              สมัครสมาชิก
            </StyledButton>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;

const StyledButton = styled(Button)`
  width: 100px;
`;
