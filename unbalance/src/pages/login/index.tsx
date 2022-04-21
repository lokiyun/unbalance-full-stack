import React, { ChangeEvent, useState } from 'react'
import './style.scss'

const Login = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
  const [password, setpassword] = useState(sessionStorage.getItem('password') || '')

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem('username', event.target.value)
    setUsername(event.target.value)
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem('password', event.target.value)
    setpassword(event.target.value)
  }

  const handleLogin = () => {
    sessionStorage.clear()
  }

  return (
    <div className='w-full h-full relative'>
      <div className='login-bg'>
        <div className='login-drop-shadow'>
          <div className='login-glass'></div>
          <div className='flex login-container'>
            <div className='flex flex-col login-form'>
              <header className='font-bold text-lg text-center'>欢迎来到聊天室</header>
              <label htmlFor="username">账户名</label>
              <input id='username' type="text" value={username} onChange={(e) => handleChangeUsername(e)} />
              <label htmlFor="password">密码</label>
              <input id='password' type="password" value={password} onChange={(e) => handleChangePassword(e)}  />
              <button className='login-button' onClick={handleLogin}>登录</button>
            </div>
            <div className='flex justify-center items-center login-aside'>
              <div className='login-label'>一个普通的聊天室</div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login