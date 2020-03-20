import React, { useState } from 'react'
import { Button, Table, message, Modal, Input, Tooltip } from 'antd'
import { useMount } from 'react-use'
import { postCardAll, postCardDelete } from '../../api'
import { InfoCircleOutlined, SmileOutlined } from '@ant-design/icons'
import { getters } from '../../sessionStorage'
import { withRouter } from 'react-router-dom'


function Cards(props:any) {
  let { history } = props
  let [dataSource, setDataSource] = useState<any>([])
  let showDetail = (record:any) => {
    history.push(`/write/${record.id}`)
  }
  let doDelete = (id:number) => {
    postCardDelete({cardid: id}).then((res:any) => {
      let { code, msg } = res
      if (code ===0) {
        postCardAll().then((res:any) => {
          let { list } = res
          list.length && setDataSource(list)
        })
        message.success('删除成功~')
      } else {
        message.error(msg)
      }
    })
  }

  useMount(() => {
    postCardAll().then((res:any) => {
      let { list } = res
      list.length && setDataSource(list)
    })
  })
  const columns = [
    {
      title: '操作',
      width: '15%',
      dataIndex: 'operation',
      render: (_: any, record:any) => {
        return (
          <div>
            <Button type="primary" size="small" onClick={() => {showDetail(record)}} style={{ marginBottom: 6 }}>查看详情</Button>
            <Button type="danger" size="small" onClick={() => {doDelete(record.id)}}>删除</Button>
          </div>
        )
      }
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '15%',
    },
    {
      title: '点赞',
      dataIndex: 'like',
      width: '10%',
    },
    {
      title: '踩踩',
      dataIndex: 'dislike',
      width: '10%',
    },
    {
      title: '评论数',
      dataIndex: 'sumComment',
      width: '10%',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: '20%',
    },
  ]

  return (
    <div>
      <Table rowKey="id" dataSource={dataSource} columns={columns}></Table>
    </div>
  )
}

export default withRouter(Cards)