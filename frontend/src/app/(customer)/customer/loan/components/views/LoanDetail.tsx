import TitleForm from '@/components/Title/Title';
import { ILoanIdRes } from '@/service/models/loan/loanIdRes';
import { Col, Row, Skeleton, Space, Typography } from 'antd';
import React from 'react';

type Props = {
  data: ILoanIdRes;
};

const { Text } = Typography;
const LoanDetail = ({ data }: Props) => {
  if (!data) return <Skeleton paragraph={{ rows: 2 }} />;

  return (
    <Row>
      <Col span={24}>
        <TitleForm label={'รายละเอียด'} justify={'start'} />
      </Col>
      <Col span={24}>
        <Row>
          <Col span={2}>ยอดเงินกู้ :</Col>
          <Col span={4}>
            <Space size={4}>{data.loanAmount}บาท</Space>
          </Col>
        </Row>
        <Row>
          <Col span={2}>ดอกเบี้ย :</Col>
          <Col span={4}>
            <Space size={4}>{data.interestRate}%</Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoanDetail;
