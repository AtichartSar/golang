import React from 'react';
import { Col, Row } from 'antd';
import TableLoan from './components/Table/Table';

type Props = {};

const Loan = (props: Props) => {
  return (
    <Row justify='end' gutter={[16, 16]}>
      <Col span={24}>
        <TableLoan />
      </Col>
    </Row>
  );
};

export default Loan;
