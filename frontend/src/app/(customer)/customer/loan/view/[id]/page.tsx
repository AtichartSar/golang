'use client';
import TitleForm from '@/components/Title/Title';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, message } from 'antd';
import { getLoan } from '@/service/api/loanService';
import { useRouter } from 'next/navigation';
import LoanDetail from '../../components/views/LoanDetail';
import { ILoanIdRes } from '@/service/models/loan/loanIdRes';
import PaymentList from '../../components/views/PaymentList';

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [data, setData] = useState<ILoanIdRes>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const id = params.id;

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getLoan(id);

      console.log('data', JSON.stringify(res.data));

      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      router.push('loan');
      message.error('เกิดข้อผิดพลาด');
    }
  };

  useEffect(() => {
    fetch();
  }, [id]);

  const handleBack = () => {
    router.push('/customer/loan');
  };

  return (
    <Fragment>
      <Row justify='end'>
        <Button className='w-100' onClick={handleBack}>
          กลับ
        </Button>
      </Row>
      <LoanDetail data={data} />
      <br />
      <PaymentList data={data} />
    </Fragment>
  );
};

export default Page;
