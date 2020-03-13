import React, { useState } from 'react'
import { List, Spin, Tag, message, Input } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import './Write.css'
import { Carousel } from 'antd'
import { useMount } from 'react-use'
import { getCardDetail, postComment } from '../../api'
import { SendOutlined } from '@ant-design/icons'

const { Search } = Input

export default function Recommend(props:any) {
    let { id } = props.match.params
    let [name, setName] = useState('')
    let [pic, setPic] = useState([])
    let [loading, setLoading] = useState(false)
    let [hasMore, setHasmore] = useState(true)
    let [comments, setComments] = useState([])
    let [page, setPage] = useState(1)
    let [pageSize] = useState(10)

    let handleInfiniteOnLoad = () => {
        if (hasMore) {
            let data  = comments
            setLoading(true)
            getCardDetail({id, page, pageSize}).then((res:any) => {
                let { pic, name, comments } = res
                setPic(pic)
                setName(name)
                setComments(data.concat(comments))
                setHasmore(true)
                setLoading(false)
                if (comments.length < pageSize) {
                    message.warning('已经到底了~')
                    setHasmore(false)
                    setLoading(false)
                }
            })
        }
    }
    let doPostComment = async (comment:any) => {
        if (comment) {
            let res:any = await postComment({id,comment})
            let { code, msg, detail } = res
            if (code === 0) {
                let temp = JSON.parse(JSON.stringify(comments))
                temp.unshift(detail)
                setComments(temp)
                message.success(msg)
            } else {
                message.error(msg)
            }
        } else {
            message.warning('请检查输入框~')
        }
    }
    useMount(() => {
        getCardDetail({id, page, pageSize}).then((res:any) => {
            let { pic, name, comments } = res
            setPic(pic)
            setName(name)
            setComments(comments)
            setPage(page + 1)
        })
    })

    return (
        <div className="mt-container">
            <h2 className="text-center">{name}</h2>
            <Carousel  style={{height: '200px', width: '100vw', minHeight: '200px'}}>
            {/* autoplay */}
                {
                    pic.map((url, index) => {
                        return (
                            <div key={index}>
                                <div className="full-image margin-auto"
                                    style={{ backgroundImage: 'url(' + ('https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' || url) + ')',
                                    height: '200px', width: '80vw'
                                    }}>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
            <br/>
            <Search placeholder="input search text"
                onSearch={(comment) => { doPostComment(comment) }}
                enterButton={<SendOutlined twoToneColor="#1890ff"/>}
            />
            <div className="demo-infinite-container" style={{borderTop: 0}}>
                <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
                >
                <List
                    dataSource={comments}
                    renderItem={(item:any) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                        title={(<p className="space-between"><Tag color="blue">{item.userName}</Tag><Tag color="purple">{item.time}</Tag></p>)}
                        description={item.content}
                        />
                        {/* <div>Content</div> */}
                    </List.Item>
                    )}
                >
                    {loading && hasMore && (
                    <div className="demo-loading-container">
                        <Spin />
                    </div>
                    )}
                </List>
                </InfiniteScroll>
            </div>
        </div>
    )
}