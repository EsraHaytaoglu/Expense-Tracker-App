import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Table, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import { addRecord, getRecords } from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { Record, RecordForm } from "../types/records";

const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0,
  };

function Records() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories} =useSelector((state: AppState) => state.categories)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const[updateId, setUpdateId]= useState<number | null>(null);
  const[deleteId, setDeleteId]= useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new")  dispatch(addRecord(form));
    // else if (mode === "edit" && typeof updateId === 'number') dispatch(updateRecord(form, updateId));
    // else if (mode === "delete" && typeof deleteId === "number") dispatch(deleteRecord(deleteId))
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null)
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
        title: "Last Update",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (updatedAt: string, record: Record) => {
            const updatedAtObj = new Date(updatedAt)
          return <>{updatedAtObj.toLocaleDateString()}{""} {updatedAtObj.toLocaleTimeString("tr-TR",{
              hour: "2-digit",
              minute: '2-digit'
          })}</>;
        },
      },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => (
        <Space size="middle">
          <EditOutlined onClick={() => {}} />
          <DeleteOutlined onClick={() => {}} />
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories())
  }, []);

  const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Button type="primary" >
            New Record
          </Button>
        </div>
        <Modal
          title={mode === "new" ? "Create new Record" : mode === "edit" ? "Update Record" : "Delete  Record"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "edit" || mode === "new" ? (
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Title">
                <Input
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  name="amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  value={form.category_id}
                  defaultValue={form.category_id}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  <Select.Option value={0} disabled >Select a category</Select.Option>
                  {
                      categories.map(category => {
                          return <Select.Option value="expense" key={category.id}>Expense</Select.Option>
                      })
                  }
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                ;
              </Form.Item>
            </Form>
          ) : mode === "delete" ? <> Are you sure?
          </> : null
        }
        
        </Modal>
      </div>
      <Table loading={loading} dataSource={data} columns={columns} />
    </React.Fragment>
  );
}

export default Records;
