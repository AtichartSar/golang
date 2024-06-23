import React, { Fragment } from "react";
import TablePayment from "./components/Table/table";
import { Col, Row } from "antd";

type Props = {};

const Page = (props: Props) => {
  return (
    <Fragment>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24}>
          <TablePayment />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Page;
