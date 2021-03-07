import React from 'react'


const RegisterForm = ({
  SetForm,username,SetUsername, name, SetName, password, SetPassword,
  passwordagain, SetPasswordAgain, handleRegisterSubmit, message, SetMessage
}) => {

  

  return (
    <div>
      <h1>Register</h1>
      <h6>{message}</h6>
      <div className = 'form'>
        <div className = 'form-group'>
          <label>Username: </label>
          <input type = "text" name = "username" placeholder ="username" value = { username} onChange = { event => SetUsername(event.target.value)}></input>
        </div>
        <div className = 'form-group'>
          <label>Name: </label>
          <input type = "text" name = "name" placeholder ="name" value = { name } onChange = {event => SetName( event.target.value)}></input>
        </div>
        <div className = 'form-group'>
          <label>Password: </label>
          <input type = "text" name = "password" placeholder ="password" value = { password} onChange = {event => SetPassword( event.target.value)}></input>
        </div>
        <div className = 'form-group'>
          <label>Password again: </label>
          <input type = "text" name = "passwordagain" placeholder ="Password again" value = { passwordagain} onChange = {event => SetPasswordAgain( event.target.value)}></input>
        </div>
      </div>
      <div className = 'footer'>
        <button className = 'button' onClick = {handleRegisterSubmit}>Submit</button>
        <button className = 'button' onClick = {() => SetForm('Login')}>Login</button>
      </div>
    </div>
  )
}


export default RegisterForm;