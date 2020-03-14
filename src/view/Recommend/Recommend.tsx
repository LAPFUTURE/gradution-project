import React, { useState } from 'react'
import { getSettingInfo, getTopLike } from '../../api'
import { Row, Col } from 'antd'
import SelfCard from '../../components/SelfCard/SelfCard'
import { useMount } from 'react-use'

export default function Recommend() {
  let [cardData, setCardData] = useState<any>([])
  useMount(async () => {
    let res:any = await getSettingInfo()
    let { settingInfo } = res
    let result:any = await getTopLike({pageSize: settingInfo.recommendPageCardNum.value})
    setCardData(result.list)
  })
  return (
    <div style={{ marginTop: 14 }}>
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
  )
}