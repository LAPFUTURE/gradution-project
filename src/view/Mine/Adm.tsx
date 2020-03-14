import React, { useState } from 'react'
import { Card, Button, Modal, Input, Tooltip, message } from 'antd'
import { getters, setters } from '../../sessionStorage'

import { withRouter } from 'react-router-dom'
import { LikeOutlined, CommentOutlined, SmileOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons'
import { postChangeUserName } from '../../api'

function Adm() {
  let userInfo = getters.GET_USERINFO()

  let [oldUserName, setOldUserName] = useState(userInfo.userName)
  let [userNameVisible, setUserNameVisible] = useState(false)
  let [userName, setUserName] = useState('')
  
  let userNameHandleOk = async () => {
    if(userName) {
      let res:any = await postChangeUserName({userName})
      let { code, msg } = res
      if(code === 0) {
        setUserNameVisible(false)
        let userInfo = getters.GET_USERINFO()
        userInfo.userName = userName
        setters.SET_USERINFO(userInfo)
        setOldUserName(userName)
        message.success(msg)
      } else {
        message.error(msg)
      }
    } else {
      message.warning('请检查输入框~')
    }
  }
  return (
    <div>
      <Card hoverable className="margin-auto"
        title={`Hello,${oldUserName}`}
        extra={<Button size="small"
        onClick={()=>{setUserNameVisible(true)}}>修改昵称 <EditOutlined /></Button>}
        style={{ width: 300 }}>
        {/* <p style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => {history.push('/publish')}}>我要发布 <SendOutlined /></Button>
        </p>
        <p style={{ textAlign: 'center' }}>
          <Badge count={ 12 } style={{ backgroundColor: '#52c41a' }}>
            <Button type="primary">我的收藏 <LikeOutlined /></Button>
          </Badge>
        </p>
        <p style={{ textAlign: 'center' }}>
          <Badge count={ 12 } style={{ backgroundColor: '#52c41a' }}>
            <Button type="primary">我的评论 <CommentOutlined /></Button>
          </Badge>
        </p> */}
      </Card>
      <Modal
        centered
        title="修改昵称"
        visible={userNameVisible}
        onOk={userNameHandleOk}
        onCancel={() => {setUserNameVisible(false)}}
      >
        <Input
          placeholder="请输入您的昵称"
          value={userName}
          onChange={(e)=>{setUserName(e.target.value)}}
          prefix={<SmileOutlined className="site-form-item-icon" />}
          suffix={
              <Tooltip title="Extra information">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
          }
        />
      </Modal>
    </div>
  )
}
export default withRouter(Adm)