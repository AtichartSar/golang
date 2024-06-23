import React, { Fragment } from "react";
import FormLoan from "../components/Form/FormLoan";
import TitleForm from "@/components/Title/Title";

type Props = {};

const page = (props: Props) => {
  return (
    <Fragment>
      <TitleForm label="สร้าง" justify="start" />
      <FormLoan />
    </Fragment>
  );
};

export default page;
