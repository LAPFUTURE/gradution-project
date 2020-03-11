import React from 'react'
import { Input, Tooltip, Card, Button, Select } from 'antd'
import { InfoCircleOutlined, UserOutlined, KeyOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'

const InputGroup = Input.Group
const { Option } = Select

function Login(props:any) {
    console.log('login props', props)
    let { history } = props
    let goRegister = () => {
        history.push('/register')
    }
    return (
        <div style={{ paddingTop: 60 }}>
            <Card hoverable title={<p style={{ textAlign: "center" }}>登录</p>} extra='' style={{ width: 300 }} className="margin-auto">
                <Input
                placeholder="请输入您的账号"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                    <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
                />
                <br />
                <br />
                <Input.Password prefix={<KeyOutlined />} placeholder="请输入您的密码" />
                <br />
                <br />
                <div className="space-around" style={{width: '80%'}}>
                    <InputGroup compact>
                        <Select style={{ width: 250 }} defaultValue="Home">
                            <Option value="Home">学生</Option>
                            <Option value="Company">食堂人员</Option>
                        </Select>
                    </InputGroup>
                </div>
                <br />
                <br />
                <div className="space-between">
                    <Button className="margin-auto" type="primary" icon={<LoginOutlined />}>
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
