import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu, BackTop } from 'antd';
import Home from '../Home/Home'
import Recommend from '../Recommend/Recommend'
import Mine from '../Mine/Mine'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Write from '../Write/Write'
import './App.css'
class App extends React.Component {
  
  state = {
    current: 'home',
  };

  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  componentDidMount() {
    console.log('mounted')
  }
    // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }
    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    // })
    // window.addEventListener('unhandledrejection', event => {
    //   // 可以在这里添加一些代码，以便检查event.promise 中的 promise 和event.reason 中的 rejection 原因
    //   console.log(`status:${event.reason.request.status},statusText:${event.reason.request.statusText}`)
    //   event.preventDefault()
    // }, false)
  render() {
    return (
      <Router>
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"
      className="menu-container">
        <Menu.Item key="home">
          <Link to="/"><MailOutlined />首页</Link>
        </Menu.Item>
        <Menu.Item key="recommend">
          <Link to="/recommend"><AppstoreOutlined />推荐</Link>
        </Menu.Item>
        <Menu.Item key="mine">
          <Link to="/mine"><AppstoreOutlined />我的</Link>
        </Menu.Item>
      </Menu>
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
    );
  }
}
export default App
