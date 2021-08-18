import React, { useEffect, useState } from 'react'
import style from './login.module.scss'
import { useHistory } from 'react-router-dom'
import { Input, Form } from 'antd'

const Sign = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
}

const Login = (props) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [active, setActive] = useState(Sign.SIGN_IN)

  const signIn = () => {
    console.log(history)
    history.push(Sign.SIGN_IN)
    setActive(Sign.SIGN_IN)
  }

  const signUp = () => {
    history.push(Sign.SIGN_UP)
    setActive(Sign.SIGN_UP)
  }

  useEffect(() => {

  }, [])

  return (
    <div className={style.login}>
      <div className={style.nav}>
        <div 
          className={active === Sign.SIGN_IN ? style.active : ''}
          onClick={signIn}
        >登录</div>
        <b>·</b>
        <div
          className={active === Sign.SIGN_UP ? style.active : ''}
          onClick={signUp}
        >注册</div>
      </div>

      <Form
        form={form}
      >
        <Form.Item>
          <Input placeholder="手机号或邮箱"></Input>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
