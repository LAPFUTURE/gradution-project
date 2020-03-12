import React, { useState } from 'react'
import { Input, Tooltip, Card, Button, Select, message } from 'antd'
import { InfoCircleOutlined, UserOutlined, KeyOutlined, LogoutOutlined, LoginOutlined, SmileOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { postRegister, getRoleList } from '../../api/index'
import { useMount } from 'react-use'

const InputGroup = Input.Group
const { Option } = Select

function Register(props:any) {
    let { history } = props
    let [userName, setUserName] = useState('')
    let [account, setAccount] = useState('')
    let [password, setPassword] = useState('')
    let [rePassword, setRePassword] = useState('')
    let [role, setRole] = useState('0')
    let [roleList,setRoleList] = useState([])

    let doRegister = async () => {
        if(![userName, account, password, rePassword].every(Boolean)) {
            message.warning('请检查输入框~')
            return false
        } else if(password !== rePassword) {
            message.warning('两次密码输入不一致~')
            return false
        }
        let res:any = await postRegister({account, password, role})
        let {code, msg} = res
        code === 0 ? message.success(msg) : message.error(msg)
    }
    let goLogin = () => {
        history.push('/login')
    }

    useMount(() => {
        getRoleList().then((res:any) => {
            let { list } = res
            setRoleList(list)
        })
    })

    return (
        <div style={{ paddingTop: 20 }}>
            <Card hoverable title={<p style={{ textAlign: "center" }}>注册</p>} extra='' style={{ width: 300 }} className="margin-auto">
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
                <br />
                <br />
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
                <Input.Password value={password} onChange={(e) => {setPassword(e.target.value)}}
                prefix={<KeyOutlined />}
                placeholder="请输入您的密码" />
                <br />
                <br />
                <Input.Password value={rePassword} onChange={(e) => {setRePassword(e.target.value)}}
                prefix={<KeyOutlined />}
                placeholder="请再次输入您的密码" />
                <br />
                <br />
                <div className="space-around" style={{width: '80%'}}>
                    <InputGroup compact>
                        <Select style={{ width: 250 }} defaultValue={role}
                         onChange={(value) => {
                            setRole(value)
                        }}>
                            {
                                roleList.map((item:any) => (
                                    <Option value={item.role} key={item.role}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </InputGroup>
                </div>
                <br />
                <br />
                <div className="space-between">
                    <Button className="margin-auto" type="primary" icon={<LoginOutlined />}
                    onClick={doRegister}>
                        注册
                    </Button>
                    <Button className="margin-auto" type="default" icon={<LogoutOutlined />}
                    onClick={goLogin}>
                        去登录
                    </Button>
                </div>
            </Card>
        </div>
    )
}
export default withRouter(Register)