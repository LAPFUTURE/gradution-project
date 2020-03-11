import React, { useState } from 'react'
import { Input, Tooltip, Card, Button, Select, message } from 'antd'
import { InfoCircleOutlined, UserOutlined, KeyOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { postLogin } from '../../api/index'
import { setters } from '../../sessionStorage'

const InputGroup = Input.Group
const { Option } = Select

function Login(props:any) {
    let { history } = props
    let [account, setAccount] = useState('')
    let [password, setPassword] = useState('')
    let [role, setRole] = useState('1')

    let goRegister = () => {
        history.push('/register')
    }
    let doLogin = async () => {
        if(![account, password].every(Boolean)) {
            message.warning('请检查输入框~')
            return false
        }
        let res:any = await postLogin({account,password,role})
        let {code, msg, token} = res
        if(code === 0) {
            setters.SET_TOKEN(token)
            message.success(msg)
        } else {
            message.error(msg)
        }    
    }
    return (
        <div style={{ paddingTop: 20 }}>
            <Card hoverable title={<p style={{ textAlign: "center" }}>登录</p>} extra='' style={{ width: 300 }} className="margin-auto">
                <Input
                placeholder="请输入您的账号"
                value={account}
                onChange={(e)=>{setAccount(e.target.value)}}
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
                />
                <br />
                <br />
                <Input.Password value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                prefix={<KeyOutlined />} placeholder="请输入您的密码" />
                <br />
                <br />
                <div className="space-around" style={{width: '80%'}}>
                    <InputGroup compact>
                        <Select style={{ width: 250 }} defaultValue={role}
                        onChange={(value) => {setRole(value)}}
                        >
                            <Option value="1">学生</Option>
                            <Option value="2">食堂工作人员</Option>
                        </Select>
                    </InputGroup>
                </div>
                <br />
                <br />
                <div className="space-between">
                    <Button className="margin-auto" type="primary" icon={<LoginOutlined/>}
                    onClick={doLogin}
                    >
                        登录
                    </Button>
                    <Button className="margin-auto" type="default" icon={<LogoutOutlined />}
                    onClick={goRegister}>
                        去注册
                    </Button>
                </div>
            </Card>
        </div>
    )
}
export default withRouter(Login)