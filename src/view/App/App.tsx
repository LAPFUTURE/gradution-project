import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { useMount } from 'react-use'
import { AppstoreOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, BackTop } from 'antd';
import Home from '../Home/Home'
import Recommend from '../Recommend/Recommend'
import Mine from '../Mine/Mine'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Write from '../Write/Write'
import './App.css'

function App(props:any) {
  let [current, setCurrent] = useState('home')

  useMount(() => {
    console.log('mounted')
  })

  let handleClick = (e: any) => {
    setCurrent(e.key)
  }

  return (
    <Router>
    <div style={{ height: 46 }}>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"
      className="menu-container">
        <Menu.Item key="home">
          <Link to="/"><MailOutlined />首页</Link>
        </Menu.Item>
        <Menu.Item key="recommend">
          <Link to="/recommend"><AppstoreOutlined />推荐</Link>
        </Menu.Item>
        <Menu.Item key="mine">
          <Link to="/mine"><UserOutlined />我的</Link>
        </Menu.Item>
      </Menu>
    </div>
    <Switch>
      <Route path="/recommend">
        <Recommend />
      </Route>
      <Route path="/mine">
        <Mine />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/write/:id" component={Write}>
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    <BackTop />
    </Router>
  )
}
export default App
