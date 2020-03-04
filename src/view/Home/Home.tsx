import React, { useState, useEffect } from 'react'
// import useMount from 'react-use'
import { Col, Row } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'
import './Home.css'

interface cardData {
    id: number,
    name: string,
    title: string,
    pic: Array<string>,
    description: string,
    like: number,
    dislike: number
}
export default function Home() {
    let [cardData, setCardData] = useState<any>([])
    useEffect(()=>{
        let temp:Array<cardData> = [{
            id: 0,
            name: 'LAPFUTURE4',
            title: '肉末茄子',
            pic:[
                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            ],
            description: 'deliclous4',
            like: 5,
            dislike: 2
        }]
        for (let i = 1; i < 10; i++) {
            temp.push({
                id: i,
                name: 'LAPFUTURE4',
                title: '肉末茄子',
                pic:[
                    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
                ],
                description: 'deliclous4',
                like: i + 5,
                dislike: i + 2
            })
        }
        setCardData(temp)
    }, [])
    return (
        <div style={{ marginTop: '60px' }}>
            {/* <p className="space-around" style={{ marginTop: '14px' }}>
                <Button type="default" size="small">One</Button>
                <Button type="default" size="small">Two</Button>
                <Button type="default" size="small">Three</Button>
            </p> */}
            <div>
                <Row>
                    {
                        cardData.map((item:any) => (
                            <Col span={12} key={item.id}>
                                <SelfCard data={item}/>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </div>
    )
}