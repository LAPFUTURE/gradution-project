import React from 'react'
import { getters } from '../../sessionStorage'
import Login from '../Login/Login'
import Adm from '../Adm/Adm'
import Student from '../Student/Student'
import Worker from '../Worker/Worker'

function Mine() {
  let userInfo = getters.GET_USERINFO()
  console.log()
  let role = userInfo.roleDetail.role
  if (role === -1) {
    return <Adm />
  } else if(role === 0) {
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