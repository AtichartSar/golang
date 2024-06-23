"use client";
import React from "react";
import FormLogin from "./components/form/Form";
import TitleForm from "../../../components/Title/Title";
import FormContainer from "../components/containner/FormContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <FormContainer>
      <TitleForm label="เข้าสู่ระบบ" justify="center" />
      <FormLogin />
    </FormContainer>
  );
};

export default page;
