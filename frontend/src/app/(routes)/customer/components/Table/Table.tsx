'use client';

import { IPaginationTable } from '@/interface/paginationTable';
import { deleteCustomer, getCustomerList } from '@/service/api/customerService';
import {
  ICustomerItem,
  ICustomerListRes,
  ICustomerTable,
} from '@/service/models/customer/customerListRes';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Space, Table, TableProps, message } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {};

const TableCustomer = (props: Props) => {
  const searchParams = useSearchParams();
  const [dataSource, setDataSource] = useState<ICustomerTable>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleEdit = (id: string) => {
    router.push(`/customer/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/customer/view/${id}`);
  };

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
      const res: ICustomerListRes = await getCustomerList(params);
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
      await deleteCustomer(id);
      message.success('ลบข้อมูลสำเร็จ');
      fetch();
    } catch (error) {
      setLoading(false);
      message.error('เกิดข้อผิดพลาด');
    }
  };

  const columns: TableProps<ICustomerItem>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'อำเภอ',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'รหัสไปรษณีย์',
      dataIndex: 'postcode',
      key: 'postcode',
    },
    {
      title: 'โทรศัพท์',
      dataIndex: 'phone',
      key: 'phone',
    },
    { title: 'อีเมล', dataIndex: 'email', key: 'email' },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, records) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(String(records.id))} />
          <Button
            loading={loading}
            icon={<DeleteOutlined onClick={() => handleDelete(String(records.id))} />}
          />
          <Button
            icon={<SearchOutlined />}
            onClick={() => {
              handleView(String(records.id));
            }}
          />
        </Space>
      ),
    },
  ];

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

export default TableCustomer;
