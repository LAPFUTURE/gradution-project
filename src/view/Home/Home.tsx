import React, { useState } from 'react'
import { getCardData } from '../../api'
import { Col, Row,Input } from 'antd'
import { useMount } from 'react-use'
import SelfCard from '../../components/SelfCard/SelfCard'
import './Home.css'

const { Search } = Input

export default function Home() {
    let [cardData, setCardData] = useState<any>([])
    let [searchWord] = useState('')

    useMount(() => {
        getCardData({searchWord:'', page: 1, pageSize: 10}).then((res: any) => {
            let { list } = res
            setCardData(list)
        })
    })

    let doSearch = async (value:string) => {
        let res:any = await getCardData({searchWord, page: 1, pageSize: 10})
        let { list } = res
        setCardData(list)
    }

    return (
        <div>
            <p className="space-around margin-auto" style={{ marginTop: 14, width:'80vw', marginBottom:14 }}>
                <Search placeholder="input search text"
                onSearch={(value) => {doSearch(value)}}
                enterButton />
            </p>
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