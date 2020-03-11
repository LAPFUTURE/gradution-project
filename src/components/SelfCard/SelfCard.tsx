import React, { useState } from 'react'
import {
    Link
} from 'react-router-dom'
import { Card, Badge } from 'antd'
import { EditOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import './SelfCard.css'

const { Meta } = Card
interface cardData {
    id: number,
    name: string,
    title: string,
    belong: string,
    pic: Array<string>,
    description: string,
    like: number,
    dislike: number
}
export default function Index(props: { data: cardData }) {
    let { data } = props
    if (data.like > 99 || data.like < 0) {
        data.like = 99
    } 
    if (data.dislike > 99 || data.dislike < 0) {
        data.dislike = 99
    } 
    let [like, setLike] = useState<number>(data.like)
    return (
        <div style={{marginBottom: "14px"}}>
            <Card
                className="self-card"
                hoverable={true}
                cover={
                <img
                    alt="example"
                    src={ 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' || data.pic[0] }
                />
                }
                actions={[
                <Badge count={like}>
                    <span className="head-example">
                        <LikeOutlined twoToneColor="#eb2f96" key="setting"
                        onClick={() => {
                            console.log(like)
                            setLike(like + 1)
                            console.log(data)
                        }}/>
                    </span>
                </Badge>,
                <Badge count={data.dislike} style={{ backgroundColor: '#52c41a' }}>
                    <span className="head-example">
                        <DislikeOutlined key="dislike" />,
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
                title={data.title + data.belong}
                description={<p className="ellipsis">{data.description}</p>}
                />
            </Card>
        </div>
    )
}