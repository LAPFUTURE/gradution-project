import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Home from '../Home/Home'
import Recommend from '../Recommend/Recommend'
import Mine from '../Mine/Mine'
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

  render() {
    return (
      <Router>
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal"  style={{ display: 'flex', justifyContent: 'space-around' }}>
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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </Router>
    );
  }
}
export default App
