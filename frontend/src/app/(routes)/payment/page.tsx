import React from 'react';
import TablePayment from './components/Table/table';
import { Col, Row } from 'antd';

const Page = () => {
  return (
    <Row justify='end' gutter={[16, 16]}>
      <Col span={24}>
        <TablePayment />
      </Col>
    </Row>
  );
};

export default Page;
