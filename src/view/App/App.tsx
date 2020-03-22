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
import Publish from '../Publish/Publish'
import Notice from '../Notice/Notice'
import Comment from '../Comment/Comment'
import Collection from '../Collection/Collection'
import Mypublish from '../MyPublish/Mypublish'
import './App.css'

function App(props:any) {
  let [current, setCurrent] = useState('home')

  useMount(() => {
    // document.addEventListener('touchmove', function(e) {
    //   e.preventDefault()
    // },{ passive: false })
    let c:any = document.querySelector('#evanyou-canvas')
    let x = c.getContext('2d')
    let pr = window.devicePixelRatio || 1
    let w = window.innerWidth
    let h = window.innerHeight
    let f = 90
    let q:any
    let m = Math
    let r = 0
    let u = m.PI * 2
    let v = m.cos
    let z = m.random
    c.width = w * pr
    c.height = h * pr
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function init() {
      x.clearRect(0, 0, w, h)
      q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }]
      while (q[1].x < w + f) d(q[0], q[1])
    }
    function d(i:any, j:any) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      let k = j.x + (z() * 2 - 0.25) * f
      let n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle =
        '#' +
        (
          ((v(r) * 127 + 128) << 16) |
          ((v(r + u / 3) * 127 + 128) << 8) |
          (v(r + (u / 3) * 2) * 127 + 128)
        ).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = { x: k, y: n }
    }
    function y(p:any):any {
      let t = p + (z() * 2 - 1.1) * f
      return t > h || t < 0 ? y(p) : t
    }
    // document.onclick = init
    // document.ontouchstart = init
    init()
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
      <Route path="/mineLogined">
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
      <Route path="/publish">
        <Publish />
      </Route>
      <Route path="/notice">
        <Notice />
      </Route>
      <Route path="/comment">
        <Comment />
      </Route>
      <Route path="/collection">
        <Collection/>
      </Route>
      <Route path="/mypublish">
        <Mypublish/>
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    <BackTop />
    <canvas id="evanyou-canvas" className="evan-you"></canvas>
    </Router>
  )
}
export default App
