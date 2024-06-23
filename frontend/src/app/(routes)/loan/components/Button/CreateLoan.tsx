"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

type Props = {};

const CreateLoanButton = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/loan/create");
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

export default CreateLoanButton;
