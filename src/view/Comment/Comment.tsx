import React, { useState } from 'react'
import { List, message } from 'antd'
import { postCommentAll, postCommentDelete } from '../../api'
import { FieldTimeOutlined, DeleteColumnOutlined } from '@ant-design/icons'
import { useMount } from 'react-use'

export default function Comment() {
  let [listData, setListData] = useState<any>([])

  let doPostCommentAll = () => {
    postCommentAll().then((res:any) => {
      let { code, msg, list } = res
      if (code === 0) {
        list.length && setListData(list.reverse())
      } else {
        message.error(msg)
      }
    })
  }

  useMount(() => {
    doPostCommentAll()
  })
  const IconText = (res:any) => (
    <span>
      {React.createElement(res.icon, { style: { marginRight: 8 } })}
      {res.text}
    </span>
  )
  let deleteComment = async (id:number) => {
    let res:any = await postCommentDelete({id})
    let { code, msg } = res
    if (code === 0) {
      doPostCommentAll()
      message.success('删除成功')
    } else {
      message.error(msg)
    }
  }
  
  return (
    <div style={{ margin:'20px 10px', borderRadius: 2 }}>
      <div className="text-center" style={{ marginBottom: 20 }}>评论</div>
      <List
        bordered
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 5,
        }}
        dataSource={listData}
        footer={''}
        renderItem={(item:any) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={FieldTimeOutlined} text={ item.time } key="list-vertical-star-o" />,
              <span onClick={() => {deleteComment(item.id)}}>
                <DeleteColumnOutlined /> 删除
              </span>
            ]}
            extra={''}
          >
            {item.content}
          </List.Item>
        )}
      />
    </div>
  )
}