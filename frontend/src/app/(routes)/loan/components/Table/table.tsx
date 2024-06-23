"use client";
import { getLoanList } from "@/service/api/loanService";
import { defaultDate } from "@/utils/date";
import { Button, Space, Table, TableProps, message } from "antd";
import React, { use, useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

type Props = {};

const TableLoan = (props: Props) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  const handleEdit = (id: string) => {
    route.push(`/loan/edit/${id}`);
  };
  const columns: TableProps<any>["columns"] = [
    {
      title: "loanAmount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },
    {
      title: "interestRate",
      dataIndex: "interestRate",
      key: "interestRate",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date, records: any) => defaultDate(createdAt),
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: Date, records: any) => defaultDate(updatedAt),
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (_, records) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(records.id)}
          />
          <Button icon={<DeleteOutlined />} />
          <Button icon={<SearchOutlined />} />
        </Space>
      ),
    },
  ];

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getLoanList();
      setDataSource(res.data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error fetching");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Table
      loading={loading}
      rowKey="id"
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default TableLoan;
