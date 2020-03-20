import React, { useState } from 'react'
import { List, message } from 'antd'
import { postNoticeAll } from '../../api'
import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import { useMount } from 'react-use'

export default function Notice() {
  let [listData, setListData] = useState<any>([])

  useMount(() => {
    postNoticeAll().then((res:any) => {
      let { code, msg, notice } = res
      if (code === 0) {
        notice.length && setListData(notice)
        message.success(msg)
      } else {
        message.error(msg)
      }
    })
  })

  const IconText = (res:any) => (
    <span>
      {React.createElement(res.icon, { style: { marginRight: 8 } })}
      {res.text}
    </span>
  )
  
  return (
    <div style={{ margin:'20px 10px', borderRadius: 2 }}>
      <List
        bordered
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={listData}
        footer={''}
        renderItem={(item:any) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={FieldTimeOutlined} text={ item.create_time } key="list-vertical-star-o" />,
              <IconText icon={UserOutlined} text={ item.author } key="list-vertical-star-o" />
            ]}
            extra={''}
          >
            <List.Item.Meta
              title={item.title}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
}