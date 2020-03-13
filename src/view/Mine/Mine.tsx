import React from 'react'
import { getters } from '../../sessionStorage'
import Login from '../Login/Login'
import Adm from './Adm'
import Student from './Student'
import Worker from './Worker'

function Mine() {
  let userInfo = getters.GET_USERINFO()
  let arr = [<Adm />, <Student />, <Worker />]
  userInfo.role = 1
  return(
    (userInfo.role <= 1) ? arr[userInfo.role] : arr[2]
  )
}

function Index() {
  let isLogin = getters.GET_TOKEN()
  return (
    isLogin ? <Mine /> : <Login />
  )
}

export default Index