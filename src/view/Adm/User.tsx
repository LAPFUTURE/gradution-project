import React, { useState } from 'react';
import { getAllUser } from '../../api'
import './User.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
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
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
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
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   width: '30%',
    //   render: (_: any, record: Item) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <span onClick={() => save(record.key)} style={{ color: '#1890ff', marginRight: 8 }}>
    //           保存
    //         </span>
    //         <Popconfirm title="确定要取消吗?" onConfirm={cancel}>
    //           <span style={{ color: '#1890ff' }}>取消</span>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //         <Button size="small" type="primary"
    //           disabled={editingKey !== ''}
    //           onClick={() => edit(record)}>
    //           编辑
    //         </Button>
    //     );
    //   },
    // },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
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
    };
  });

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
  );
};

export default EditableTable