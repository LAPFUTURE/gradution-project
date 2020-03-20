import React, { useState } from 'react'
import { Card, Button, Modal, Input, Tooltip, message, Avatar } from 'antd'
import { getters, setters } from '../../sessionStorage'

import { SmileOutlined, InfoCircleOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons'
import { postChangeUserName } from '../../api'
import { withRouter } from 'react-router-dom'

function BaseInfo(props:any) {
  let { history } = props
  let userInfo = getters.GET_USERINFO()
  let [avatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')

  let [oldUserName, setOldUserName] = useState(userInfo.userName)
  let [userNameVisible, setUserNameVisible] = useState(false)
  let [userName, setUserName] = useState('')

  let loginOut = () => {
    setters.SET_CLEAR()
    message.success('退出账号成功~')
    history.push('/')
  }
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
    <div style={{ paddingRight: 12 }}>
      <div
        className="text-center"
        style={{ marginBottom: 24 }}>
          <Avatar size={64} src={avatar} />
      </div>
      <Card hoverable
        title={`Hello,${oldUserName}`}
        style={{ maxWidth:'80vw',margin: '0 auto' }}
        className="text-center">
        <p style={{ textAlign: 'center' }}>
          <Button
            onClick={()=>{setUserNameVisible(true)}}>
            修改昵称 <EditOutlined />
          </Button>
        </p>
        <p style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={()=>{loginOut()}}>退出账号 <LoginOutlined /></Button>
        </p>
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

export default withRouter(BaseInfo)