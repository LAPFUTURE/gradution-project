import React, { useState } from 'react'
import { Card, Badge } from 'antd'
import { EditOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import './SelfCard.css'

const { Meta } = Card
interface cardData {
    name: string,
    title: string,
    description: string,
    like: number,
    dislike: number
}
export default function Index(props: { data: cardData }) {
    let { data } = props
    let [like, setLike] = useState<number>(data.like)
    return (
        <div style={{marginBottom: "14px"}}>
            <Card
                className="self-card"
                hoverable={true}
                cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
                        <EditOutlined key="edit" />
                    </span>
                </Badge>
                ]}
            >
                <Meta
                title={data.title}
                description={data.description}
                />
            </Card>
        </div>
    )
}