import React from "react";
import moment from "moment";
import { Popconfirm } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

export default function ({ handleEditDelete }) {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      // sorter: (a, b) => a.length - b.length,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "Use Count",
      dataIndex: "useCount",
    },

    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      render: (value) => moment(value).format("YYYY-MM-DD"),
      sorter: (a, b) => a.expirationDate.length - b.expirationDate.length,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "",
      dataIndex: "id",
      render: (id) => (
        <div>
          <span>
            <EditTwoTone onClick={() => handleEditDelete(id, "edit")} />
          </span>

          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleEditDelete(id, "delete")}
          >
            <span style={{ marginLeft: 20 }}>
              <DeleteTwoTone />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return columns;
}
