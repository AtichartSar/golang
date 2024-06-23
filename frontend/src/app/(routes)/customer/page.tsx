import React, { Fragment } from "react";
import TableCustomer from "./components/Table/Table";
import { Col, Row } from "antd";

type Props = {};

const Page = (props: Props) => {
  return (
    <Fragment>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24}>
          <TableCustomer />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Page;
