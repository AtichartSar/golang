import React, { Fragment } from 'react';
import FormLoan from '../components/form/FormLoan';
import TitleForm from '@/components/Title/Title';

type Props = {};

const Page = (props: Props) => {
  return (
    <Fragment>
      <TitleForm label='สร้าง' justify='start' />
      <FormLoan mode='create' />
    </Fragment>
  );
};

export default Page;
