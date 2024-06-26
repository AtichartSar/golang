'use client';
import styled from '@emotion/styled';
import { Button, Form, FormItemProps, Input, Row, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ICustomerItem } from '@/service/models/customer/customerListRes';
import { updateCustomer } from '@/service/api/customerService';
import { ICustomerItemUpdateReq } from '@/service/models/customer/customerUpdateReq';

type Props = {
  data?: ICustomerItem;
  id?: string;
  loadForm?: boolean;
  mode: 'edit' | 'create' | 'view';
};

const FormCustomer = ({ id, data, loadForm = false, mode }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async (body: ICustomerItemUpdateReq) => {
    try {
      setLoading(true);
      await updateCustomer(id, body);
      setLoading(false);
      router.push('/customer');
      message.success('แก้ไขสำเร็จ');
    } catch (error) {
      setLoading(false);
      message.error('แก้ไขไม่สำเร็จ');
    }
  };
  const handleSubmit = () => {};
  const handleCancel = () => {
    router.push('/customer');
  };

  const disable = mode == 'view' || loadForm;

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      address: data?.address,
      district: data?.district,
      postcode: data?.postcode,
      phone: data?.phone,
      email: data?.email,
    });
  }, [data]);

  const validateForm: FormItemProps = {
    hasFeedback: loadForm ? true : false,
    validateStatus: 'validating',
  };

  return (
    <StyledForm
      form={form}
      onFinish={data ? handleEdit : handleSubmit}
      labelCol={{ span: 3 }}
      style={{ position: 'relative' }}
    >
      <Form.Item {...validateForm} name='name' label='ชื่อ' rules={[{ required: true }]}>
        <Input placeholder='ชื่อ' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...validateForm} name='address' label='ที่อยู่' rules={[{ required: true }]}>
        <Input.TextArea placeholder='ที่อยู่' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...validateForm} name='district' label='อำเภอ' rules={[{ required: true }]}>
        <Input placeholder='อำเภอ' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        {...validateForm}
        name='postcode'
        label='รหัสไปรษณีย์'
        rules={[{ required: true }]}
      >
        <Input placeholder='รหัสไปรษณีย์' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...validateForm} name='phone' label='โทรศัพท์' rules={[{ required: true }]}>
        <Input placeholder='โทรศัพท์' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item {...validateForm} name='email' label='อีเมล' rules={[{ required: true }]}>
        <Input placeholder='อีเมล' disabled={disable} style={{ width: '100%' }} />
      </Form.Item>
      <Row style={{ position: 'absolute', right: '0', bottom: '0' }}>
        <Form.Item>
          <Space>
            <Button className='w-100' onClick={handleCancel} disabled={loading}>
              {mode === 'view' ? 'กลับ' : 'ยกเลิก'}
            </Button>
            {mode === 'edit' && (
              <Button
                className='w-100'
                htmlType='submit'
                type='primary'
                loading={loading}
                icon={<SaveOutlined />}
              >
                {data ? 'แก้ไข' : 'สร้าง'}
              </Button>
            )}
          </Space>
        </Form.Item>
      </Row>
    </StyledForm>
  );
};

export default FormCustomer;

const StyledForm = styled(Form)`
  height: 100%;
`;
