import React, { useEffect, useState, useRef, Fragment } from "react";
import { Table, Input, Button, Select, Col, Row } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";

import * as helper from "../../../../helper/helper";
import * as actions from "../../actions";
import columns from "./columns";

const { Option } = Select;

const Users = () => {
  let inputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    promoCodes,
    adminUsers: { isLoading, data, error },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(actions.getUsers());
    dispatch(actions.getPromoCodes());
    return () => {};
  }, []);

  const [searchText, handleSearchChange] = useState("");
  const [searchedColumn, handleSearchedColumn] = useState("");
  const [state, setState] = useState({
    selectedRows: [],
    selectedPromo: "",
    isLoadingSendPromo: false,
    isLoadingUpdateStatus: false,
    activeId: false,
  });
  const { selectedRows, selectedPromo } = state;
  let searchInput = useRef();

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    handleSearchChange(selectedKeys[0]);
    handleSearchedColumn(dataIndex);
  }

  const handleUpdateActiveStatus = async (id, record) => {
    setState({
      ...state,
      isLoadingUpdateStatus: state.activeId === record.id ? true : false,
    });
    await dispatch(actions.updateActiveStatus(record));
    setState({
      ...state,
      isLoadingUpdateStatus: false,
      activeId: false,
    });
  };

  const handleChangeSearch = async (value) => {
    value = inputRef.input.value;
    const promoCode = promoCodes.data.find(
      (item) => value && item.code && item.code.includes(value)
    );
    value = promoCode ? promoCode.id : value;
    var pattern = new RegExp(".*" + value + ".*", "i");
    if (value !== "") {
      await dispatch(
        actions.getUsers({
          where: {
            or: [
              { name: { like: value, options: "i" } },
              { email: { like: value, options: "i" } },
              { promoCodeId: { like: value, options: "i" } },
            ],
          },
        })
      );
    } else {
      await dispatch(actions.getUsers());
    }
  };

  function handleReset(clearFilters) {
    clearFilters();
    handleSearchChange("");
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRows });
    },
    selectedRows,
  };
  const searchField = (
    <Col>
      <Input
        className="search-input-dashboard"
        placeholder={helper._("Search", "en")}
        onChange={_.debounce((e) => handleChangeSearch(), 800)}
        style={{ width: 250 }}
        ref={(searchRef) => (inputRef = searchRef)}
        prefix={<SearchOutlined />}
      />
    </Col>
  );
  return (
    <Fragment>
      <div className="heading-main">
        <h1>Users</h1>
      </div>
      <div className="filter-section  promocode-filter">
        {selectedRows.length ? (
          <Row gutter={20}>
            <Col
              xl={{ span: 18 }}
              lg={{ span: 18 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="user-select-min-width"
            >
              <Select
                style={{ marginBottom: 10 }}
                className="mb-4"
                placeholder="Select Promo Code"
                onChange={(value) =>
                  setState({ ...state, selectedPromo: value })
                }
              >
                {promoCodes.data.map((item) => {
                  return <Option value={item.id}>{item.code}</Option>;
                })}
              </Select>
              <Button
                type="primary"
                disabled={selectedPromo ? false : true}
                loading={state.isLoadingSendPromo}
                onClick={async () => {
                  setState({ ...state, isLoadingSendPromo: true });
                  await dispatch(
                    actions.assignPromo(selectedPromo, {
                      users: selectedRows.map((item) => item.id),
                    })
                  );
                  setState({
                    ...state,
                    selectedPromo: "",
                    selectedRows: [],
                    isLoadingSendPromo: false,
                  });
                }}
              >
                Send Code
              </Button>
            </Col>
            {searchField}
          </Row>
        ) : (
          <Row gutter={20}>
            <Col
              xl={{ span: 18 }}
              lg={{ span: 18 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="user-select-min-width"
            ></Col>
            {searchField}
          </Row>
        )}

        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns({
            searchFunc: getColumnSearchProps,
            promoCodes,
            handleUpdateActiveStatus,
            isLoadingUpdateStatus: state.isLoadingUpdateStatus,
            activeId: state.activeId,
          })}
          loading={isLoading}
          rowKey="id"
          selectedRows={selectedRows}
        />
      </div>
    </Fragment>
  );
};

export default Users;
