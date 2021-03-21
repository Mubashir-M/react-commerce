import React from 'react'


const RegisterForm = ({
  register, SetRegister, handleRegisterSubmit, message, SetMessage,
  msg, Setmsg
}) => {

  return (
    <div>
      <h1>Sign in</h1>
      <h4>{message}</h4>
      <h4>{msg.message}</h4>
      <div className = 'form'>
        <div className = 'form-group'>
          <label>Username: </label>
          <input type = "text" name = "username" placeholder ="username" value = { register.username} onChange = { event => SetRegister({...register, username:event.target.value})}></input>
        </div>
        <div className = 'form-group'>
          <label>Name: </label>
          <input type = "text" name = "name" placeholder ="name" value = { register.name } onChange = {event => SetRegister({...register, name:event.target.value})}></input>
        </div>
        <div className = 'form-group'>
          <label>Password: </label>
          <input type = "text" name = "password" placeholder ="password" value = { register.password} onChange = {event => SetRegister({...register, password:event.target.value})}></input>
        </div>
        <div className = 'form-group'>
          <label>Password again: </label>
          <input type = "text" name = "passwordagain" placeholder ="Password again" value = { register.passwordagain} onChange = {event => SetRegister({...register, passwordagain:event.target.value})}></input>
        </div>
      </div>
      <div className = 'footer'>
        <button className = 'button' onClick = {handleRegisterSubmit}>Submit</button>
      </div>
    </div>
  )
}


export default RegisterForm;