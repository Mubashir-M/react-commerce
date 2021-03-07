import React, {useState} from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import registersService from './services/registers'


function App() {
  
  const [form, SetForm] = useState('Register')
  const [username, SetUsername] = useState('')
  const [name, SetName] = useState('')
  const [password, SetPassword] = useState('')
  const [passwordagain, SetPasswordAgain] = useState('')
  const [message,SetMessage] = useState('')


  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    
    if (password === passwordagain) {

      const newUser  = {
        username: username,
        name: name,
        password: password,
      }

      registersService
      .create(newUser)
      .then(returnedUser => {
        SetUsername('')
        SetName('')
        SetPassword('')
        SetPasswordAgain('')
        SetMessage(`created new user with the username: ${returnedUser.username}`)
        setTimeout(() => {
          SetMessage('')
        }, 3000)
     
      })

    } else {
      
      SetMessage('password does not match password again!')
      setTimeout(() => {
        SetMessage('')
      }, 3000)
      

    }
  }

  return (
    <div>

     {
       form === 'Login' ? <LoginForm SetForm = {SetForm}/> : <RegisterForm SetForm = {SetForm} username= {username} SetUsername = {SetUsername} name = {name} SetName = {SetName}
        password = {password} SetPassword = {SetPassword} passwordagain = {passwordagain} SetPasswordAgain= {SetPasswordAgain}  handleRegisterSubmit = {handleRegisterSubmit}
        message= {message} SetMessage = {SetMessage}
     />
     }
     
    </div>
  );
}

export default App;
