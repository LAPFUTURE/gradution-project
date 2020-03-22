import React, { useState } from 'react';
import { getAllUser } from '../../api'
import './User.css'
import { Table, Input, InputNumber, Form } from 'antd';
import { useMount } from 'react-use';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell:React.FC<any> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState('');

  useMount(async () => {
    let res:any = await getAllUser()
    setData(res.allUser)
  })
  const isEditing = (record: Item) => record.key === editingKey

  const cancel = () => {
    setEditingKey('')
  };

  const columns = [
    {
      title: '昵称',
      dataIndex: 'user_name',
      width: '18%',
      editable: false,
    },
    {
      title: '账号',
      dataIndex: 'account',
      width: '25%',
      editable: false,
    },
    {
      title: '登录时间',
      dataIndex: 'login_time',
      width: '25%',
      editable: false,
    },
    {
      title: '注册时间',
      dataIndex: 'register_time',
      width: '32%',
      editable: false,
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <Table
        rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
          pageSize: 8
        }}
      />
    </Form>
  )
}

export default EditableTable