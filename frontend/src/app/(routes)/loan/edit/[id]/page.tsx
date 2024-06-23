"use client";
import TitleForm from "@/components/Title/Title";
import React, { Fragment, useEffect, useState } from "react";
import FormLoan from "../../components/Form/FormLoan";
import { message } from "antd";
import { getLoan } from "@/service/api/loanService";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const id = params.id;

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getLoan(id);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      router.push("loan");
      message.error("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  return (
    <Fragment>
      <TitleForm label="แก้ไข" justify="start" />
      <FormLoan mode="edit" data={data} id={id} loadForm={loading} />
    </Fragment>
  );
};

export default Page;
