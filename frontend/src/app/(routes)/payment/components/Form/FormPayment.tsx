"use client";
import styled from "@emotion/styled";
import {
  Button,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { IPaymentIdData } from "@/service/models/payment/paymentIdRes";

type Props = {
  data?: IPaymentIdData;
  id?: string;
  loadForm?: boolean;
  mode: "edit" | "create" | "view";
};

const FormPayment = ({ id, data, loadForm = false, mode }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = () => {};
  const handleSubmit = () => {};
  const handleCancel = () => {
    router.push("/payment");
  };

  const disable = mode == "view" || loadForm;

  useEffect(() => {
    form.setFieldsValue({
      paymentAmount: data?.paymentAmount,
      description: data?.description,
      principalBalance: data?.principalBalance,
      interestBalance: data?.interestBalance,
    });
  }, [data]);

  const validateForm: FormItemProps = {
    hasFeedback: loadForm ? true : false,
    validateStatus: "validating",
  };

  return (
    <StyledForm
      form={form}
      onFinish={data ? handleEdit : handleSubmit}
      labelCol={{ span: 3 }}
      style={{ position: "relative" }}
    >
      <Form.Item
        {...validateForm}
        name="paymentAmount"
        label="ยอดชำระ"
        rules={[{ required: true }]}
      >
        <InputNumber
          disabled={disable}
          style={{ width: "100%" }}
          controls={false}
        />
      </Form.Item>
      <Form.Item
        {...validateForm}
        name="description"
        label="หมายเหตุ"
        rules={[{ required: true }]}
      >
        <Input.TextArea disabled={disable} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        {...validateForm}
        name="principalBalance"
        label="ยอดเงินต้น"
        rules={[{ required: true }]}
      >
        <InputNumber
          disabled={disable}
          style={{ width: "100%" }}
          controls={false}
        />
      </Form.Item>
      <Form.Item
        {...validateForm}
        name="interestBalance"
        label="ยอดดอกเบี้ย"
        rules={[{ required: true }]}
      >
        <InputNumber
          disabled={disable}
          style={{ width: "100%" }}
          controls={false}
        />
      </Form.Item>
      <Row style={{ position: "absolute", right: "0", bottom: "0" }}>
        <Form.Item>
          <Space>
            <Button className="w-100" onClick={handleCancel} disabled={loading}>
              {mode === "view" ? "กลับ" : "ยกเลิก"}
            </Button>
            {mode === "edit" && (
              <Button
                className="w-100"
                htmlType="submit"
                type="primary"
                loading={loading}
                icon={<SaveOutlined />}
              >
                {data ? "แก้ไข" : "สร้าง"}
              </Button>
            )}
          </Space>
        </Form.Item>
      </Row>
    </StyledForm>
  );
};

export default FormPayment;

const StyledForm = styled(Form)`
  height: 100%;
`;
