import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Tag, message } from 'antd'
import { postCardDelete } from '../../api'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './MypublishCard.css'

const { Meta } = Card
interface cardData {
  id: number,
  name: string,
  title: string,
  userInfo: any,
  pic: string,
  description: string,
  like: number,
  dislike: number
}
export default function Index(props:any) {
    let { data, reset } = props
    if (data.like > 99 || data.like < 0) {
      data.like = 90
    } 
    if (data.dislike > 99 || data.dislike < 0) {
      data.dislike = 90
    }
    let [roleDetail] = useState(data.userInfo.roleDetail)

    let delectCard = () => {
      postCardDelete({cardid: data.id}).then((res:any) => {
        let { code, msg } = res
        if (code === 0) {
          reset()
          message.success('删除成功~')
        } else {
          message.error(msg)
        }
      })
    }
    return (
        <div style={{marginBottom: 14, position:'relative'}}>
            <Card
                className="self-card"
                hoverable={true}
                cover={
                  <img
                    alt="example"
                    src={ data.pic.split(',')[0] }
                  />
                }
                actions={[
                <Badge count={0}>
                  <span className="head-example">
                    <DeleteOutlined key="DeleteOutlined"
                    onClick={() => {delectCard()}}/>
                  </span>
                </Badge>,
                <Badge>
                  <span className="head-example">
                    <Link to={`/write/${data.id}`}>
                      <EditOutlined key="edit" />
                    </Link>
                  </span>
                </Badge>
                ]}
            >
              <Meta
              title={ <p className="space-around">
                <Tag> {data.name} </Tag>
                <Tag> {data.title} </Tag>
              </p>}
              description={<p className="ellipsis">{data.description}</p>}
              />
            </Card>
            <div style={{ position: 'absolute',top:-1,right:2 }}>
              <Tag color={roleDetail.color}>{ roleDetail.name }</Tag>
            </div>
        </div>
    )
}