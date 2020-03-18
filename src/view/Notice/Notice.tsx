import React, { useState } from 'react'
import { List, Avatar } from 'antd'
import { postNoticeAll } from '../../api'
import { MessageOutlined, LikeOutlined, StarOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import { useMount } from 'react-use'

export default function Notice() {
  let [listData, setListData] = useState<any>([])

  let temp:any = []
  for (let i = 0; i < 23; i++) {
    temp.push({
      title: `ant design part ${i}`,
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      create_time: '2019/03/23 12:12:12',
      author: 'lapfuture' + i
    });
  }
  useMount(() => {
    // postNoticeAll().then(res => {
    //   console.log(res)
    // })
  setListData(temp)
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
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        footer={''}
        renderItem={(item:any) => (
          <List.Item
            key={item.title}
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