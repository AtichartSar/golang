'use client';
import { createLoan, updateLoan } from '@/service/api/loanService';
import { loanCreateReq, loanUpdateReq } from '@/service/models/loan/loanReq';
import { SaveOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Button, Form, FormItemProps, InputNumber, Row, Space, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  data?: any;
  id?: string;
  loadForm?: boolean;
  mode: 'edit' | 'create' | 'view';
};

const FormLoan = ({ id, data, loadForm = false, mode }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const goToCustomerLoan = () => {
    router.push('/customer/loan');
  };

  const handleCancel = () => {
    goToCustomerLoan();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const handleSubmit = async (body: loanCreateReq) => {
    try {
      setLoading(true);
      await createLoan(body);
      setLoading(false);
      goToCustomerLoan();
      message.success('สร้างสำเร็จ');
    } catch (error) {
      setLoading(false);
      message.error('สร้างไม่สำเร็จ');
    }
  };

  const handleEdit = async (body: loanUpdateReq) => {
    try {
      setLoading(true);
      await updateLoan(id, body);
      setLoading(false);
      goToCustomerLoan();
      message.success('แก้ไขสำเร็จ');
    } catch (error) {
      setLoading(false);
      message.error('แก้ไขไม่สำเร็จ');
    }
  };

  const disable = mode == 'view' || loadForm;

  const validateForm: FormItemProps = {
    hasFeedback: loadForm ? true : false,
    validateStatus: 'validating',
  };

  return (
    <StyledForm
      form={form}
      onFinish={data ? handleEdit : handleSubmit}
      labelCol={{ span: 2 }}
      style={{ position: 'relative' }}
    >
      <Form.Item
        {...validateForm}
        name='loanAmount'
        label='ยอดเงินกู้'
        rules={[{ required: true }]}
      >
        <InputNumber disabled={disable} style={{ width: '100%' }} controls={false} />
      </Form.Item>
      <Form.Item
        {...validateForm}
        name='interestRate'
        label='ดอกเบี้ย'
        rules={[{ required: true }]}
      >
        <InputNumber disabled={disable} style={{ width: '100%' }} controls={false} />
      </Form.Item>
      <Row style={{ position: 'absolute', right: '0', bottom: '0' }}>
        <Form.Item>
          <Space>
            <Button className='w-100' onClick={handleCancel} disabled={loading}>
              ยกเลิก
            </Button>
            <Button
              className='w-100'
              htmlType='submit'
              type='primary'
              loading={loading}
              icon={<SaveOutlined />}
            >
              {data ? 'แก้ไข' : 'สร้าง'}
            </Button>
          </Space>
        </Form.Item>
      </Row>
    </StyledForm>
  );
};

export default FormLoan;

const StyledForm = styled(Form)`
  height: 100%;
`;
