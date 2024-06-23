"use client";
import { createLoan, updateLoan } from "@/service/api/loanService";
import { loanCreateReq, loanUpdateReq } from "@/service/models/loan/loanReq";
import styled from "@emotion/styled";
import {
  Button,
  Col,
  Flex,
  Form,
  InputNumber,
  Row,
  Space,
  Spin,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";

type Props = {
  data?: any;
  id?: string;
  loadForm?: boolean;
};

const FormLoan = ({ id, data, loadForm = false }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    router.push("/loan");
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const handleSubmit = async (body: loanCreateReq) => {
    try {
      setLoading(true);
      await createLoan(body);
      setLoading(false);
      router.push("/loan");
      message.success("สร้างสำเร็จ");
    } catch (error) {
      setLoading(false);
      message.error("สร้างไม่สำเร็จ");
    }
  };

  const handleEdit = async (body: loanUpdateReq) => {
    try {
      setLoading(true);
      await updateLoan(id, body);
      setLoading(false);
      router.push("/loan");
      message.success("แก้ไขสำเร็จ");
    } catch (error) {
      setLoading(false);
      message.error("แก้ไขไม่สำเร็จ");
    }
  };

  return (
    <StyledForm form={form} onFinish={data ? handleEdit : handleSubmit}>
      <StyledFlex vertical={true} justify="space-between">
        <Spin spinning={loadForm}>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                name="loanAmount"
                label="loanAmount"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "50%" }} controls={false} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="interestRate"
                label="interestRate"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "50%" }} controls={false} />
              </Form.Item>
            </Col>
          </Row>
        </Spin>
        <Row justify="end">
          <Form.Item>
            <Space>
              <Button
                className="w-100"
                onClick={handleCancel}
                disabled={loading}
              >
                ยกเลิก
              </Button>
              <Button
                className="w-100"
                htmlType="submit"
                type="primary"
                loading={loading}
                icon={<SaveOutlined />}
              >
                {data ? "แก้ไข" : "สร้าง"}
              </Button>
            </Space>
          </Form.Item>
        </Row>
      </StyledFlex>
    </StyledForm>
  );
};

export default FormLoan;

const StyledForm = styled(Form)`
  height: 100%;
`;

const StyledFlex = styled(Flex)`
  height: 100%;
`;
