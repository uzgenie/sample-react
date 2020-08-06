import React from "react";
import { Button } from "antd";
import moment from "moment";

export default function ({
  searchFunc,
  promoCodes,
  handleUpdateActiveStatus,
  isLoadingUpdateStatus,
  activeId,
}) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      ...searchFunc("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      ...searchFunc("email"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (value) => (!value.isDeleted ? "Active" : "Blocked"),
      // sorter: (a, b) => a.length - b.length,
      // sortDirections: ["descend", "ascend"],
    },

    {
      title: "Promo Code",
      dataIndex: "promoCodeId",
      render: (id) => promoCodes.data.find((item) => item.id === id)?.code,
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("YYYY-MM-DD"),
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      dataIndex: "id",
      render: (id, record) => {
        return (
          <Button
            danger={record.isActive}
            onClick={() => {
              handleUpdateActiveStatus(id, record);
            }}
            loading={activeId ? true : false}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>
        );
      },
    },
  ];
  return columns;
}
