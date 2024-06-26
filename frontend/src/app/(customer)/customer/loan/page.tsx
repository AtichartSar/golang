import React from 'react';
import TableLoan from './components/table/Table';
import CreateLoanButton from './components/button/CreateLoan';
import { Col, Row } from 'antd';

type Props = {};

const Page = (props: Props) => {
  return (
    <Row justify='end' gutter={[16, 16]}>
      <Col>
        <CreateLoanButton />
      </Col>
      <Col span={24}>
        <TableLoan />
      </Col>
    </Row>
  );
};

export default Page;
