import React from 'react'

const LoginForm = ({SetForm, username, SetUsername, password, SetPassword, handleLogin, message ,msg }) => {

  return (
    <div>
      <h1>Login</h1>
      <h4>{message}</h4>
      <h4>{msg.message}</h4>
      <div className = 'form'>
        <div className = 'form-group'>
          <label>Username: </label>
          <input type = "text" name = "username" placeholder ="username" value = {username} onChange = { event => SetUsername(event.target.value)}></input>
        </div>
        <div className = 'form-group'>
          <label>Password: </label>
          <input type = "text" name = "password" placeholder ="password" value = {password} onChange = { event => SetPassword(event.target.value)}></input>
        </div>
      </div>
      <div className = 'footer'>
        <button className = 'button' onClick = {handleLogin}>Submit</button>
        <button className = 'button' onClick = {() => SetForm('Register')}>Register</button>
      </div>
    </div>
  )
}


export default LoginForm;