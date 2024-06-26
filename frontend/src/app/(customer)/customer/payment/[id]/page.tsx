import React from 'react';
import FormPayment from '../components/form/FormPayment';

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return <FormPayment id={params.id} mode='create' />;
};

export default Page;
