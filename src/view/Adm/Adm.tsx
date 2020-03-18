import React from 'react'
import Notice from './Notice'
import BaseInfo from './BaseInfo'
import User from './User'
import Setting from './Setting'
import { Tabs } from 'antd'

const { TabPane } = Tabs

export default function Adm() {
  let tabSetting = [ 
    { tabName:'基本信息', value: <BaseInfo /> },
    { tabName:'管理公告', value: <Notice/> },
    { tabName:'管理用户', value: <User /> },
    { tabName:'管理配置', value: <Setting />},
    ]

  return (
    <div style={{ marginTop: 14 }}>
    <Tabs tabPosition={'left'}>
      {
        tabSetting.map((item) => (
          <TabPane tab={item.tabName} key={ item.tabName }>
            { item.value }
          </TabPane>
        ))
      }
    </Tabs>
  </div>
  )
}
