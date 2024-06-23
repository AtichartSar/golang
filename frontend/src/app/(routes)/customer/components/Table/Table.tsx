"use client";

import { Button, Space, Table, TableProps, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IPaginationTable } from "@/interface/pagitationTable";
import { getCustomerList } from "@/service/api/customerService";
import {
  ICustomerItem,
  ICustomerListRes,
  ICustomerTable,
} from "@/service/models/customer/customerListRes";

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

  const columns: TableProps<ICustomerItem>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "รหัสไปรษณีย์",
      dataIndex: "postcode",
      key: "postcode",
    },
    {
      title: "โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
    },
    { title: "อีเมล", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, records) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(String(records.id))}
          />
          <Button icon={<DeleteOutlined />} />
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

  useEffect(() => {
    fetch();
  }, [searchParams]);

  let current = searchParams.get("current")
    ? Number(searchParams.get("current"))
    : 1;
  let pageSize = searchParams.get("pageSize")
    ? Number(searchParams.get("pageSize"))
    : 5;

  const handleChange = (pagination: IPaginationTable) => {
    const params = new URLSearchParams(searchParams);
    params.set("current", pagination.current.toString());
    params.set("total", pagination.total.toString());
    params.set("pageSize", pagination.pageSize.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const fetch = async () => {
    try {
      setLoading(true);
      const params = { page: current, limit: pageSize };
      const res: ICustomerListRes = await getCustomerList(params);

      console.log(res.data);

      setDataSource(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error fetching");
    }
  };

  return (
    <Table
      size="small"
      loading={loading}
      rowKey="id"
      dataSource={dataSource?.items}
      columns={columns}
      onChange={handleChange}
      pagination={{
        total: dataSource?.paging?.count,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
        pageSize: pageSize,
        current: current,
      }}
    />
  );
};

export default TableCustomer;
