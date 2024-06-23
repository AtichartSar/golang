import React, { Fragment } from "react";
import TableLoan from "./components/Table/table";
import { Button, Col, Row } from "antd";
import CreateLoanButton from "./components/ฺีิิButton/CreateLoan";

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
