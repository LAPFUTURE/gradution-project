import React, { useState } from 'react'
import { Button, Card, Col, Row, Avatar, Badge } from 'antd'
import { EditOutlined, EllipsisOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import './Home.css'

const { Meta } = Card

interface Person {
    name: string,
    age: number
}
export default function Home() {
    // let [num, setNum] = useState<number>(0)
    // let [name, setName] = useState<string>('')
    // let [person, setPerson] = useState<Person>({name: 'lap', age: 22})
    return (
        <div>
            <p className="space-around" style={{ marginTop: '14px' }}>
                <Button type="default" size="small">One</Button>
                <Button type="default" size="small">Two</Button>
                <Button type="default" size="small">Three</Button>
            </p>
            {/* <Button onClick={() => { setNum(num+1) }}>
              yeah { num }
            </Button>
            <Button onClick={() => { setName('LAPFUTURE is a boy!') }}>
              showName { name }
            </Button>
            <Button onClick={() => { setPerson({ name: 'LAPFUTURE', age: 21 }) }}>
              setPerson { person.name + person.age }
            </Button> */}
            <div>
                <Row gutter={12}>
                    <Col span={12}>
                        <Card
                            style={{ width: "100%" }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                            }
                            actions={[
                            <Badge count={12}>
                                <span className="head-example">
                                    <LikeOutlined twoToneColor="#eb2f96" key="setting" onClick={() => {console.log(123)}}/>
                                </span>
                            </Badge>,
                            <Badge count={5} style={{ backgroundColor: '#52c41a' }}>
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
                            title="肉末茄子"
                            description="这是一个很好吃的菜！！！"
                            />
                        </Card>,
                    </Col>
                    <Col span={12}>
                        <Card
                            style={{ width: '100%' }}
                            cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                            }
                            actions={[
                            <LikeOutlined key="setting" onClick={() => {console.log(123)}}/>,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                            />
                        </Card>,
                    </Col>
                </Row>
            </div>
        </div>
    )
}