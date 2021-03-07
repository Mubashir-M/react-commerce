import React from 'react'

const LoginForm = ({SetForm}) => {

  return (
    <div>
      <h1>Login</h1>
      <div className = 'form'>
        <div className = 'form-group'>
          <label>Username: </label>
          <input type = "text" name = "username" placeholder ="username" ></input>
        </div>
        <div className = 'form-group'>
          <label>Password: </label>
          <input type = "text" name = "password" placeholder ="password"></input>
        </div>
      </div>
      <div className = 'footer'>
        <button className = 'button'>Submit</button>
        <button className = 'button' onClick = {() => SetForm('Register')}>Register</button>
      </div>
    </div>
  )
}


export default LoginForm;