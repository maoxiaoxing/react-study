import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import routes from '../../router/routes'
import { Route, useHistory, withRouter } from 'react-router-dom'
import style from './style.module.css'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const MxxLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()

  const toggle = (route) => {
    setCollapsed(!collapsed)
  }

  const toPage = (route) => {
    history.push(route.key)
  }

  const renderMenu = (routes) => {
    return routes.map((route, index) => {
      return (
        <React.Fragment key={route.path + index}>
          {
            route.children ? 
            <SubMenu key={route.path} title={route.title}>
              {
                renderMenu(route.children)
              }
            </SubMenu> :
            <Menu.Item key={route.path} path={route.path} onClick={toPage}>
              {route.title}
            </Menu.Item>
          }
        </React.Fragment>
      )
    })
  }

  const RouterView = (props) => {
    return props.routes.map((item, index) => {
      return <Route key={index} exact={false} path={item.path} render={(routeProps) => {
        if (item.children) {
          return <RouterView {...routeProps} routes={item.children} />
        } else {
          return <item.component {...routeProps} />
        }
      }} />
    })
  }

  return (
    <Layout>
      <Sider trigger={null} collapsed={collapsed} collapsible>
        <div className={'logo'} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          { renderMenu(routes) }
        </Menu>
      </Sider>
      <Layout className={style.myLayout}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })
          }
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {
            <RouterView routes={routes} />
          }
        </Content>
      </Layout>
    </Layout>
  )
}

export default MxxLayout
