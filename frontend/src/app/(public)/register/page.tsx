"use client";
import React from "react";
import FormRegister from "./components/form/Form";
import { Typography } from "antd";
import FormContainer from "../components/containner/FormContainer";
import TitleForm from "../../../components/Title/Title";

type Props = {};

const { Title } = Typography;

const Register = (props: Props) => {
  return (
    <FormContainer>
      <TitleForm label="สมัครสมาชิก" justify="center" />
      <FormRegister />
    </FormContainer>
  );
};

export default Register;
