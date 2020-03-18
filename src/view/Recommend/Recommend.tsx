import React, { useState } from 'react'
import { getRecommandPageCardData } from '../../api'
import { Row, Col } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'
import { useMount } from 'react-use'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default function Recommend() {
  let [cardData, setCardData] = useState<any>([])
  useMount(async () => {
    let result:any = await getRecommandPageCardData()
    result && setCardData(result.list)
  })
  return (
    <div style={{ marginTop: 14 }}>
      {
        cardData.length?
        <Row>
          {
            cardData.map((item:any) => (
              <Col span={12} key={item.id}>
                <SelfCard data={item}/>
              </Col>
            ))
          }
        </Row>
        :
        <div className="text-center"><ExclamationCircleOutlined />暂无数据~</div>
      }
    </div>
  )
}