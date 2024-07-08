'use client';
import { IPaginationTable } from '@/interface/paginationTable';
import { deleteLoan, getLoanList } from '@/service/api/loanService';
import { ILoanTable, LoanListRes } from '@/service/models/loan/loanListRes';
import { defaultDate } from '@/utils/date';
import { currency, percent } from '@/utils/format';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {};

const TableLoan = (props: Props) => {
  const searchParams = useSearchParams();
  const [dataSource, setDataSource] = useState<ILoanTable>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleEdit = (id: string) => {
    router.push(`/loan/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/loan/view/${id}`);
  };

  const columns: TableProps<any>['columns'] = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    {
      title: 'ยอดเงินกู้',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (loanAmount: string, records: any) => currency(loanAmount),
    },
    {
      title: 'ชื่อผู้กู้',
      dataIndex: ['customer', 'name'],
      key: 'customer.name',
    },
    {
      title: 'ดอกเบี้ย',
      dataIndex: 'interestRate',
      key: 'interestRate',
      render: (interestRate: string, records: any) => percent(interestRate),
    },
    {
      title: 'วันที่กู้เงิน',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date, records: any) => defaultDate(createdAt),
    },
    {
      title: 'วันที่แก้ไข',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: Date, records: any) => defaultDate(updatedAt),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, records) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(records.id)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(records.id)} />
          <Button icon={<SearchOutlined />} onClick={() => handleView(records.id)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetch();
  }, [searchParams]);

  let current = searchParams.get('current') ? Number(searchParams.get('current')) : 1;
  let pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 5;

  const handleChange = (pagination: IPaginationTable) => {
    const params = new URLSearchParams(searchParams);
    params.set('current', pagination.current.toString());
    params.set('total', pagination.total.toString());
    params.set('pageSize', pagination.pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const fetch = async () => {
    try {
      setLoading(true);
      const params = { page: current, limit: pageSize };
      const res: LoanListRes = await getLoanList(params);
      setDataSource(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Error fetching');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteLoan(id);
      message.success('ลบข้อมูลสำเร็จ');
      fetch();
    } catch (error) {
      setLoading(false);
      message.error('เกิดข้อผิดพลาด');
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

export default TableLoan;
