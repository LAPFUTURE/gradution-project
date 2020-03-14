import React, { useState } from 'react'
import { Avatar, Card, Button, Modal, Input, Tooltip, message, Badge } from 'antd'
import { getters, setters } from '../../sessionStorage'
import { postChangeUserName, postChangePassword, getCommentSumAndCollectionSum } from '../../api' 
import { SendOutlined, LikeOutlined, SettingFilled, CommentOutlined, SmileOutlined, InfoCircleOutlined, KeyOutlined, EditOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { useMount } from 'react-use'

function Student(props:any) {
  let { history } = props
  let userInfo = getters.GET_USERINFO()

  let [avatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
  let [userNameVisible, setUserNameVisible] = useState(false)
  let [userName, setUserName] = useState('')
  let [oldUserName, setOldUserName] = useState(userInfo.userName)
  let [collectionSum, setCollectionSum] = useState(0)
  let [commentSum, setCommentSum] = useState(0)

  let [password, setPassword] = useState('')
  let [newPassword, setNewPassword] = useState('')
  let [passwordVisible, setPasswordVisible] = useState(false)

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
        setOldUserName(userName)
        message.success(msg)
      } else {
        message.error(msg)
      }
    } else {
      message.warning('请检查输入框~')
    }
  }
  let passwordHandleOk = async () => {
    if (password && newPassword) {
      let res:any = await postChangePassword({password, newPassword})
      let { code, msg } = res
      if (code === 0) {
        message.success(msg)
        history.push('/login')  
      } else {
        message.error(msg)
      }
    } else {
      message.warning('请检查输入框~')
    }
  }
  useMount(() => {
    getCommentSumAndCollectionSum().then((res:any) => {
      if (res.collectionSum > 999) {
        setCollectionSum(999)
      } else {
        setCollectionSum(res.collectionSum)
      }
      if (res.commentSum > 999) {
        setCommentSum(999)
      } else {
        setCommentSum(res.commentSum)
      }
    })
  })
return (
  <div>
    <div onClick={changeAvatar}
    className="text-center"
    style={{ marginTop: 24, marginBottom: 24 }}>
      <Avatar size={64} src={avatar} />
    </div>
    <Card hoverable className="margin-auto"
    title={`Hello,${oldUserName}`}
    extra={<Button size="small"
    onClick={()=>{setUserNameVisible(true)}}>修改昵称 <EditOutlined /></Button>}
    style={{ width: 300 }}>
      <p style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => {history.push('/publish')}}>我要发布 <SendOutlined /></Button>
      </p>
      <p style={{ textAlign: 'center' }}>
        <Badge count={ collectionSum } style={{ backgroundColor: '#52c41a' }}>
          <Button type="primary">我的收藏 <LikeOutlined /></Button>
        </Badge>
      </p>
      <p style={{ textAlign: 'center' }}>
        <Badge count={ commentSum } style={{ backgroundColor: '#52c41a' }}>
          <Button type="primary">我的评论 <CommentOutlined /></Button>
        </Badge>
      </p>
      <p style={{ textAlign: 'center' }}><Button type="primary" onClick={()=>{setPasswordVisible(true)}}>修改密码 <SettingFilled /></Button></p>
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
    <Modal
      centered
      title="修改密码"
      visible={passwordVisible}
      onOk={passwordHandleOk}
      onCancel={() => {setPasswordVisible(false)}}
    >
      <Input.Password value={password} onChange={(e) => {setPassword(e.target.value)}}
      prefix={<KeyOutlined />}
      placeholder="请输入您的原密码" />
      <br />
      <br />
      <Input.Password value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}
      prefix={<KeyOutlined />}
      placeholder="请输入您的新密码" />
    </Modal>
  </div>
)
}
export default withRouter(Student)