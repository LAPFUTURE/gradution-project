import React, { useState } from 'react'
import { postCardUser } from '../../api'
import { Col, Row } from 'antd'
import { useMount } from 'react-use'
import MypublishCard from './MypublishCard'


export default function Mypublish() {
  let [cardDataLeft, setCardDataLeft] = useState<any>([])
  let [cardDataRight, setCardDataRight] = useState<any>([])

  let doPostCardUser = () => {
    postCardUser()
    .then((result:any) => {
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
  }
  useMount(() => {
    doPostCardUser()
  })
  let reset = () => {
    doPostCardUser()
  }
  return (
    <div>
      <p className="text-center" style={{ marginTop: 14 }}>我的发布</p>
      <div>
        <Row>
          <Col span={12}>
            {
              cardDataLeft.map((item:any) => (
                <Col span={24} key={item.id}>
                  <MypublishCard reset={reset} data={item}/>
                </Col>
              ))
            }
          </Col>
          <Col span={12}>
            {
              cardDataRight.map((item:any) => (
                <Col span={24} key={item.id}>
                  <MypublishCard reset={reset} data={item}/>
                </Col>
              ))
            }
          </Col>
        </Row>
      </div>
    </div>
  )
}