import React, { useState } from 'react'
import { getRecommandPageCardData } from '../../api'
import { Row, Col } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'
import { useMount } from 'react-use'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default function Recommend() {
  let [cardDataLeft, setCardDataLeft] = useState<any>([])
  let [cardDataRight, setCardDataRight] = useState<any>([])
  useMount(async () => {
    let result:any = await getRecommandPageCardData()
    let { list } = result
    if (list && list.length) {
      let left:any = []
      let right:any = []
      for(let i = 0, length = list.length; i < length; i++) {
        if (i%2 ===0) {
          left.push(list[i])
        } else {
          right.push(list[i])
        }
      }
      setCardDataLeft(left)
      setCardDataRight(right)
    }
  })
  return (
    <div style={{ marginTop: 14 }}>
      {
        cardDataLeft.length?
        <Row>
          <Col span={12}>
            {
              cardDataLeft.map((item:any) => (
                <Col span={24} key={item.id}>
                  <SelfCard data={item}/>
                </Col>
              ))
            }
          </Col>
          <Col span={12}>
            {
              cardDataRight.map((item:any) => (
                <Col span={24} key={item.id}>
                  <SelfCard data={item}/>
                </Col>
              ))
            }
          </Col>
        </Row>
        :
        <div className="text-center"><ExclamationCircleOutlined />暂无数据~</div>
      }
    </div>
  )
}