import React, { useState } from 'react';
import { getSettingInfo, postChangeSettingInfo } from '../../api'
import './User.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, message } from 'antd';
import { useMount } from 'react-use';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
  value: string;
  mean: string;
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
    let res:any = await getSettingInfo()
    let arr:any = []
    let keySettingInfo = Object.keys(res.settingInfo)
    for(let i of keySettingInfo) {
      arr.push(res.settingInfo[i])
    }
    setData(arr)
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
        postChangeSettingInfo({id:item.id, value:row.value, mean: row.mean})
        .then((res:any) => {
          if (res.code === 0) {
            setData(newData);
            setEditingKey('');
            message.success('保存成功~')
          } else {
            message.error(res.msg)
          }
        })
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
      title: 'operation',
      dataIndex: 'operation',
      width: '30%',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <span onClick={() => save(record.key)} style={{ color: '#1890ff', marginRight: 8 }}>
              保存
            </span>
            <Popconfirm title="确定要取消吗?" onConfirm={cancel}>
              <span style={{ color: '#1890ff' }}>取消</span>
            </Popconfirm>
          </span>
        ) : (
            <Button size="small" type="primary"
              disabled={editingKey !== ''}
              onClick={() => edit(record)}>
              编辑
            </Button>
        );
      },
    },
    {
      title: 'key',
      dataIndex: 'key',
      width: '25%',
      editable: false,
    },
    {
      title: '值',
      dataIndex: 'value',
      width: '25%',
      editable: true,
    },
    {
      title: '含义',
      dataIndex: 'mean',
      width: '25%',
      editable: true,
    },
    
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