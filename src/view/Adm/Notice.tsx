import React, { useState } from 'react'
import { useMount } from 'react-use'
import { postNoticeAll, postCreateNotice, postNoticeUpdate, postNoticeDelete } from '../../api'
import { InfoCircleOutlined, SmileOutlined } from '@ant-design/icons'
import './User.css'
import { getters } from '../../sessionStorage'
import { Table, Input, InputNumber, Popconfirm, Form, Button, message, Modal, Tooltip } from 'antd';

interface Item {
  id: any,
  key: string;
  name: string;
  age: number;
  address: string;
  value: string;
  mean: string;
  title: string;
  content: string;
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input.TextArea autoSize={{ minRows:4 }} />;

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
export default function Notice() {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState('');

  const [data, setData] = useState<any>([]);
  let [noticeTitle, setNoticeTitle] = useState('')
  let [noticeContent, setNoticeContent] = useState('')
  let [noticeVisible, setNoticeVisible] = useState(false)
  let noticeHandleOk = async () => {
    let res:any = await postCreateNotice({title: noticeTitle,
      content:noticeContent,
      author: getters.GET_USERINFO().userName})
    let { code, msg } = res
    code === 0 ? message.success(msg) : message.error(msg)
  }

  let doPostNoticeAll =()=>{
    postNoticeAll().then((res:any) => {
      let { code, notice, msg } = res
      if (code === 0) {
        notice.length && setData(notice)
      } else {
        message.error(msg)
      }
    })
  }

  useMount(() => {
    doPostNoticeAll()
  })

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id:any) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        postNoticeUpdate({id:item.id, title:row.title, content: row.content})
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
  let deleteCard = (record:any) => {
    postNoticeDelete({id: record.id}).then((res:any) => {
      let { code, msg } = res
      if (code === 0) {
        message.success('删除成功~')
        doPostNoticeAll()
      } else {
        message.error(msg)
      }
    })
  }
  const columns = [
    {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <span onClick={() => save(record.id)} style={{ color: '#1890ff', marginRight: 8 }}>
              保存
            </span>
            <Popconfirm title="确定要取消吗?" onConfirm={cancel}>
              <span style={{ color: '#1890ff' }}>取消</span>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Button size="small" type="primary" style={{ marginBottom: 4 }}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}>
              编辑
            </Button>
            <Button size="small" type="danger"
              disabled={editingKey !== ''}
              onClick={() => deleteCard(record)}>
              删除
            </Button>
          </div>
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '20%',
      editable: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: '25%',
      editable: true,
    },
    {
      title: '发布者',
      dataIndex: 'author',
      width: '20%',
      editable: false,
    },
    {
      title: '发布时间',
      dataIndex: 'create_time',
      width: '20%',
      editable: false,
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
    <div>
      <p><Button size="small" type="primary" onClick={() => {
        setNoticeVisible(true)
      }}>创建公告</Button></p>
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
      <Modal
      centered
      title="创建公告"
      visible={noticeVisible}
      onOk={noticeHandleOk}
      onCancel={() => {setNoticeVisible(false)}}
    >
      <Input
        placeholder="请输入标题~"
        value={noticeTitle}
        onChange={(e)=>{setNoticeTitle(e.target.value)}}
        prefix={<SmileOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input.TextArea
        style={{ marginTop: 10 }}
        autoSize={{ minRows: 3, maxRows: 5 }}
        placeholder="请输入内容~"
        value={noticeContent}
        onChange={(e)=>{setNoticeContent(e.target.value)}}
      />
    </Modal>
    </div>
  )
}