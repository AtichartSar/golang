'use client';
import { IPaginationTable } from '@/interface/paginationTable';
import { getPaymentList } from '@/service/api/paymentService';
import { defaultDate } from '@/utils/date';
import { currency } from '@/utils/format';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const TablePayment = () => {
  const searchParams = useSearchParams();
  const [dataSource, setDataSource] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleEdit = (id: string) => {
    router.push(`/payment/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/payment/view/${id}`);
  };

  const columns: TableProps<any>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'วันที่ชำระ',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (paymentDate: string, records: any) => defaultDate(paymentDate),
    },
    {
      title: 'ชื่อผู้กู้',
      dataIndex: ['loan', 'customer', 'name'],
      key: 'customer.name',
    },
    {
      title: 'ยอดชำระ',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render: (paymentAmount: string, records: any) => currency(paymentAmount),
    },
    {
      title: 'ยอดเต็ม',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (loanAmount: string, records: any) => currency(loanAmount),
    },

    {
      title: 'ยอดเงินต้น',
      dataIndex: 'principalBalance',
      key: 'principalBalance',
      render: (principalBalance: string, records: any) => currency(principalBalance),
    },
    {
      title: 'ยอดดอกเบี้ย',
      dataIndex: 'interestBalance',
      key: 'interestBalance',
      render: (interestBalance: string, records: any) => currency(interestBalance),
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, records) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(records.id)} />
          <Button onClick={() => handleView(records.id)} icon={<SearchOutlined />} />
        </Space>
      ),
    },
  ];

  let current = searchParams.get('current') ? Number(searchParams.get('current')) : 1;
  let pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 5;

  const handleChange = (pagination: IPaginationTable) => {
    const params = new URLSearchParams(searchParams);
    params.set('current', pagination.current.toString());
    params.set('total', pagination.total.toString());
    params.set('pageSize', pagination.pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetch();
  }, [searchParams]);

  const fetch = async () => {
    try {
      setLoading(true);
      const params = { page: current, limit: pageSize };
      const res: any = await getPaymentList(params);
      setDataSource(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error fetching');
    }
  };

  return (
    <Table
      size='small'
      loading={loading}
      rowKey='id'
      dataSource={dataSource?.items}
      columns={columns}
      onChange={handleChange}
      pagination={{
        total: dataSource?.paging?.count,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        pageSize: pageSize,
        current: current,
      }}
    />
  );
};

export default TablePayment;
