import React, { useEffect, useState } from 'react'
import style from './login.module.scss'
import { useHistory } from 'react-router-dom'
// import './login.scss'

const Sign = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
}

const Login = (props) => {
  const history = useHistory()
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
    </div>
  )
}

export default Login
