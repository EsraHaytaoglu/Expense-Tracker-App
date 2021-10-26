import { SketchPicker } from 'react-color';
import { Button, Input, Table, Tag, Form, Modal, Select } from 'antd'
import  React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { addCategory, getCategories } from '../store/actions/categoryActions';
import { Category } from '../types/category';

type Mode = "new" | "edit";
interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black"
}

function Categories() {
  
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm)

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode)
  };


  const handleOk = () => {
    dispatch(addCategory(form));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  console.log(data,loading,error);
    
    
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "id",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCategories());
    }, []);
    return (
      <React.Fragment>
        <div>
        <Button type="primary" onClick={()=> showModal("new")}>
          New Category
         </Button>
         <Modal title={mode === "new" ? "Create new Category" : "Update Category"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: !form.name }} >
           <Form 
           labelCol={{ span: 8}}
           wrapperCol={{ span: 16 }}>
         <Form.Item label="Category Name" >
          <Input name='name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </Form.Item>
        <Form.Item label="Category Type">
          <Select defaultValue="expense" onChange={type => setForm({ ...form, type })}>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Color" >
        <SketchPicker color={form.color} onChange={color => setForm({ ...form, color: color.hex })} />;
        </Form.Item>
        </Form>
        </Modal>
        </div>
        <Table columns={columns} dataSource={data} />
      </React.Fragment>
    )
}

export default Categories;
