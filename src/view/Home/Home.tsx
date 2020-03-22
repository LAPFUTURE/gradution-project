import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { postHomePageCardData, postSearch, postNotice } from '../../api'
import { Col, Row,Input, notification, Tag, message } from 'antd'
import { useMount } from 'react-use'
import SelfCard from '../../components/SelfCard/SelfCard'
import './Home.css'

const { Search } = Input

export default function Home() {
  let [loading, setLoading] = useState(false)
  let [hasMore, setHasmore] = useState(true)
  let [cardDataLeft, setCardDataLeft] = useState<any>([])
  let [cardDataRight, setCardDataRight] = useState<any>([])
  let [homePageNum, setHomePageNum] = useState(1)
  let [homePageSize,setHomePageSize] = useState(5)

  let handleInfiniteOnLoad = () => {
    if (hasMore) {
        let dataLeft  = cardDataLeft
        let dataRight = cardDataRight
        setLoading(true)
      postHomePageCardData({page: homePageNum})
      .then((result:any) => {
        let { list } = result
        for(let i = 0, length = list.length; i < length; i++) {
          if (i%2 ===0) {
            dataRight.push(list[i])
          } else {
            dataLeft.push(list[i])
          }
        }
        setCardDataLeft(dataLeft)
        setCardDataRight(dataRight)
        setHasmore(true)
        setLoading(false)
        if (list.length < homePageSize) {
          message.warning('已经到底了~')
          setHasmore(false)
          setLoading(false)
        }
      })
    }
  }
  let doPostHomePageCardData = (num:any) => {
    postHomePageCardData({page: num})
    .then((result:any) => {
      let { list } = result
      if (list && list.length) {
        setHomePageSize(list.length)
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
        setHomePageNum(num+1)
      }
    })
  }
  useMount(() => {
    doPostHomePageCardData(homePageNum)
    postNotice().then((res:any) => {
      let { code, notice } = res
      if (code === 0) {
        if (!localStorage.getItem('homePageNoticeId')) {
          localStorage.setItem('homePageNoticeId', String(notice.id))
          notification.info({
            message: notice.title,
            description: <div>
              {notice.content}
              <p className="space-between">
                <Tag color="purple">{ notice.author }</Tag>
                <Tag color='blue'> { notice.create_time }</Tag>
              </p>
            </div>
          })
        } else {
          if (!(localStorage.getItem('homePageNoticeId') === String(notice.id))) {
            localStorage.setItem('homePageNoticeId', String(notice.id))
            notification.info({
              message: notice.title,
              description: <div>
                {notice.content}
                <p className="space-between">
                  <Tag color="purple">{ notice.author }</Tag>
                  <Tag color='blue'> { notice.create_time }</Tag>
                </p>
              </div>
            })
          }
        }
      }
    })
  })

  let doSearch = async (value:string) => {
    let res:any = await postSearch({search: value})
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
  }

  return (
    <div>
      <p className="space-around margin-auto" style={{ marginTop: 14, width:'80vw', marginBottom:14 }}>
          <Search placeholder="input search text"
          onSearch={(value) => {doSearch(value)}}
          enterButton />
      </p>
      <div className="home-demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        ><Row>
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
          </InfiniteScroll>
      </div>
    </div>
  )
}