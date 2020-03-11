import React, { useState, useEffect } from 'react'
// import useMount from 'react-use'
import { getCardData } from '../../api'
import { Col, Row } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'
import './Home.css'

export default function Home() {
    let [cardData, setCardData] = useState<any>([])
    useEffect(() => {
        getCardData().then((res: any) => {
            let { list } = res
            setCardData(list)
        })
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