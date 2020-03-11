import React from 'react'
import { getters } from '../../sessionStorage'
import { Route } from 'react-router-dom'
import Login from '../Login/Login'

function Mine() {
  return(
    <div className="mt-container">
      Mine
    </div>
  )
}

export default function Index() {
  let isLogin = getters.GET_TOKEN()
  return (
    <Route exact path="/mine">
      {
        isLogin ? <Mine /> : <Login />
      }
    </Route>
  )
}