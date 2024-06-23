"use client";
import { Row, Typography } from "antd";
import React from "react";
const { Title } = Typography;

type Props = {
  label: string;
  justify:
    | "center"
    | "start"
    | "end"
    | "space-around"
    | "space-between"
    | "space-evenly";
};

const TitleForm = ({ label, justify }: Props) => {
  return (
    <div>
      <Row justify={justify}>
        <Title level={5}>{label}</Title>
      </Row>
    </div>
  );
};

export default TitleForm;
