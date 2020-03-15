import React, { useState } from 'react'
import { getHomePageCardData } from '../../api'
import { Col, Row,Input } from 'antd'
import { useMount } from 'react-use'
import SelfCard from '../../components/SelfCard/SelfCard'
import './Home.css'

const { Search } = Input

export default function Home() {
  let [cardData, setCardData] = useState<any>([])
  let [searchWord] = useState('')

  useMount(async () => {
    let result:any = await getHomePageCardData({
      searchWord:'',
      page: 1
    })
    let { list } = result
    setCardData(list)
  })

  let doSearch = async (value:string) => {
    let res:any = await getHomePageCardData({searchWord, page: 1})
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