import React from 'react'
import { getters } from '../../sessionStorage'
import Login from '../Login/Login'
import Adm from './Adm'
import Student from './Student'
import Worker from './Worker'

function Mine() {
  let userInfo = getters.GET_USERINFO()
  userInfo.role = -1
  if ((userInfo.role === -1) || (userInfo.role === '-1')) {
    return <Adm />
  } else if((userInfo.role === 0) || (userInfo.role === '0')) {
    return <Student/>
  } else {
    return (<Worker/>)
  }
}

function Index() {
  let isLogin = getters.GET_TOKEN()
  return (
    isLogin ? <Mine /> : <Login />
  )
}

export default Index