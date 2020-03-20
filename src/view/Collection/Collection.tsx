import React, { useState } from 'react'
import { postColleage } from '../../api'
import { useMount } from 'react-use'
import { Row, Col } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'


export default function Comment() {
  let [cardDataLeft, setCardDataLeft] = useState<any>([])
  let [cardDataRight, setCardDataRight] = useState<any>([])

  let doGetColleage = () => {
    postColleage({page: 1, pageSize: 10}).then((res:any) => {
      let { list } = res
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
  }

  useMount(() => {
    doGetColleage()
  })
  return (
    <div>
       <p className="text-center" style={{ marginTop: 14 }}>我的收藏</p>
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
      </div>
  )
}