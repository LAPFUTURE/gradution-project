import React, { useState } from 'react'
import { Card, Button, Modal, Input, Tooltip, message, Avatar } from 'antd'
import { getters, setters } from '../../sessionStorage'

import { SmileOutlined, InfoCircleOutlined, EditOutlined } from '@ant-design/icons'
import { postChangeUserName } from '../../api'

export default function BaseInfo() {
  let userInfo = getters.GET_USERINFO()
  let [avatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')

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
    <div style={{ paddingRight: 24 }}>
      <div
        className="text-center"
        style={{ marginBottom: 24 }}>
          <Avatar size={64} src={avatar} />
      </div>
      <Card hoverable
        title={`Hello,${oldUserName}`}
        className="text-center">
        <Button size="small"
          onClick={()=>{setUserNameVisible(true)}}>
          修改昵称 <EditOutlined />
        </Button>
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