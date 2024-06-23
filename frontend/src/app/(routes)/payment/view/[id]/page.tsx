"use client";
import TitleForm from "@/components/Title/Title";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IPaymentIdRes } from "@/service/models/payment/paymentIdRes";
import { getPayment } from "@/service/api/paymentService";
import { message } from "antd";
import FormPayment from "../../components/Form/FormPayment";

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
      const res: IPaymentIdRes = await getPayment(id);
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
      <FormPayment mode="view" data={data} id={id} loadForm={loading} />
    </Fragment>
  );
};

export default Page;
