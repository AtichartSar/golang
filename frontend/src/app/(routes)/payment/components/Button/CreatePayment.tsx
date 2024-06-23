"use client";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button } from "antd";

type Props = {};

const CreatePaymentButton = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/payment/create");
  };

  return (
    <Button
      icon={<PlusOutlined />}
      className="w-100"
      type="primary"
      onClick={handleClick}
    >
      สร้าง
    </Button>
  );
};

export default CreatePaymentButton;
