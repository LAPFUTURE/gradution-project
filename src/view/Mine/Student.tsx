import React, { useState } from 'react'
import { Avatar, Card, Button, Modal, Input, Tooltip, message } from 'antd'
import { getters, setters } from '../../sessionStorage'
import { postChangeUserName } from '../../api' 
import { SendOutlined, LikeOutlined, SettingFilled, CommentOutlined, SmileOutlined, InfoCircleOutlined } from '@ant-design/icons'

export default function Student() {
  let [avatar, setAvatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
  let [userNameVisible, setUserNameVisible] = useState(false)
  let [userName, setUserName] = useState('')

  let userInfo = getters.GET_USERINFO()
  let changeAvatar = () => {
    console.log(123)
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
        message.success(msg)
      } else {
        message.error(msg)
      }
      console.log(res)
    } else {
      message.warning('请检查输入框~')
    }
  }
  let userNameHandleCancel = ()=> {
    setUserNameVisible(false)
  }
return (
  <div>
    <div onClick={changeAvatar} className="text-center" style={{ marginTop: 24, marginBottom: 24 }}>
      <Avatar size={64} src={avatar} />
    </div>
    <Card className="margin-auto" title={`Hello,${userInfo.userName}`} extra={<Button size="small" onClick={()=>{setUserNameVisible(true)}}>修改昵称</Button>} style={{ width: 300 }}>
      <p style={{ textAlign: 'center' }}><Button type="primary">我要发布 <SendOutlined /></Button></p>
      <p style={{ textAlign: 'center' }}><Button type="primary">我的收藏 <LikeOutlined /></Button></p>
      <p style={{ textAlign: 'center' }}><Button type="primary">我的评论 <CommentOutlined /></Button></p>
      <p style={{ textAlign: 'center' }}><Button type="primary">修改密码 <SettingFilled /></Button></p>
    </Card>
    <Modal
      centered
      title="修改昵称"
      visible={userNameVisible}
      onOk={userNameHandleOk}
      onCancel={userNameHandleCancel}
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