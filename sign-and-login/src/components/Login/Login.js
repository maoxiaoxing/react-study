import React from 'react'
import style from './login.module.scss'
import { useHistory } from 'react-router-dom'
// import './login.scss'

const Sign = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
}

const Login = (props) => {
  const history = useHistory()

  const signIn = () => {
    console.log(history)
    history.push(Sign.SIGN_IN)
  }

  const signUp = () => {
    history.push(Sign.SIGN_UP)
  }

  return (
    <div className={style.login}>
      <div className={style.nav}>
        <div onClick={signIn}>登录</div>
        <div>·</div>
        <div onClick={signUp}>注册</div>
      </div>
    </div>
  )
}

export default Login
