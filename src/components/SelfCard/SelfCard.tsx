import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Tag, message } from 'antd'
import { postLikeOrDislike } from '../../api'
import { EditOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import './SelfCard.css'

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
export default function Index(props: { data: cardData }) {
    let { data } = props
    if (data.like > 99 || data.like < 0) {
      data.like = 90
    } 
    if (data.dislike > 99 || data.dislike < 0) {
      data.dislike = 90
    }
    let [like, setLike] = useState<number>(data.like)
    let [dislike, setDislike] = useState<number>(data.dislike)
    let [roleDetail] = useState(data.userInfo.roleDetail)

    let likeOrDislike = async (type:string) => {
      let res:any = await postLikeOrDislike({id: data.id, type})
      let { code, msg } = res
      if(code === 0) { 
        message.success(msg)
        if (type === 'like') {
          setLike(like + 1)
        } else if (type === 'dislike'){
          setDislike(dislike + 1)
        }
      } else {
        message.error(msg)
      }
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
                <Badge count={like}>
                  <span className="head-example">
                    <LikeOutlined key="like"
                    onClick={() => {likeOrDislike('like')}}/>
                  </span>
                </Badge>,
                <Badge count={dislike} style={{ backgroundColor: '#52c41a' }}>
                  <span className="head-example">
                    <DislikeOutlined key="dislike"
                    onClick={() => {likeOrDislike('dislike')}}/>
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