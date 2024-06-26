import TitleForm from '@/components/Title/Title';
import { MAIN_COLOR, WHITE_COLOR } from '@/config/color';
import { ILoanIdRes, Payment } from '@/service/models/loan/loanIdRes';
import { defaultDate } from '@/utils/date';
import { currency } from '@/utils/format';
import styled from '@emotion/styled';
import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { TableVirtuoso } from 'react-virtuoso';

type Props = {
  data: ILoanIdRes;
};

const PaymentList = ({ data }: Props) => {
  if (!data) return <Skeleton paragraph={{ rows: 2 }} />;

  const sortedPayments = [...data.Payments].sort((a, b) => b.id - a.id);

  return (
    <Row>
      <Col>
        <TitleForm label={'ประวัติ'} justify={'start'} />
      </Col>
      <Col span={24}>
        <StyleContent>
          <PaymentTable data={sortedPayments} />
        </StyleContent>
      </Col>
    </Row>
  );
};

type PaymentTableProps = {
  data: Payment[];
};

const PaymentTable = ({ data }: PaymentTableProps) => {
  return (
    <TableVirtuoso
      style={{
        // minHeight: '',
        height: '300px',

        width: '100%',
      }}
      fixedHeaderContent={() => (
        <tr>
          <th>id</th>
          <th>วันที่ชำระ</th>
          <th>ยอดชำระ</th>
          <th>ยอดเงินต้น</th>
          <th>ยอดดอกเบี้ย</th>
          <th>หมายเหตุ</th>
        </tr>
      )}
      data={data}
      itemContent={(index, data) => {
        return (
          <>
            <td>{data.id}</td>
            <td>{defaultDate(data.paymentDate)}</td>
            <td>{currency(String(data.paymentAmount))}</td>
            <td>{currency(String(data.principalBalance))}</td>
            <td>{currency(String(data.interestBalance))}</td>
            <td>{data.description}</td>
          </>
        );
      }}
    />
  );
};

export default PaymentList;

const StyleContent = styled.div`
  table {
    width: 100%;
  }
  td {
    padding: 4px;
    border: 1px solid black;
  }
  th {
    background-color: ${MAIN_COLOR};
    padding: 4px;
    color: ${WHITE_COLOR};
  }
`;
