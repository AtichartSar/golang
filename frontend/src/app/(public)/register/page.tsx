"use client";
import React from "react";
import FormRegister from "./components/form/Form";
import { Typography } from "antd";
import TitleForm from "../../../components/Title/Title";
import FormContainer from "../components/container/FormContainer";

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
