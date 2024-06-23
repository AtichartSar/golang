"use client";
import TitleForm from "@/components/Title/Title";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IPaymentIdRes } from "@/service/models/payment/paymentIdRes";
import { message } from "antd";
import { getCustomer } from "@/service/api/customerService";
import FormCustomer from "../../components/Form/FormCustomer";

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
      const res: IPaymentIdRes = await getCustomer(id);
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
      <FormCustomer mode="view" data={data} id={id} loadForm={loading} />
    </Fragment>
  );
};

export default Page;
