import React, { Fragment } from "react";
import { Button, Col, Row } from "antd";
import CreateLoanButton from "./components/Button/CreateLoan";
import TableLoan from "./components/Table/Table";

type Props = {};

const Loan = (props: Props) => {
  return (
    <Fragment>
      <Row justify="end" gutter={[16, 16]}>
        <Col>
          <CreateLoanButton />
        </Col>
        <Col span={24}>
          <TableLoan />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Loan;
