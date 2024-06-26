import React from 'react';
import TableCustomer from './components/Table/Table';
import { Col, Row } from 'antd';

type Props = {};

const Page = (props: Props) => {
  return (
    <Row justify='end' gutter={[16, 16]}>
      <Col span={24}>
        <TableCustomer />
      </Col>
    </Row>
  );
};

export default Page;
