import React, {useState, useEffect} from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import AccountForm from './components/Account'
import userService from './services/user'
import loginService from './services/login'
import itemService from './services/items'



function App() {
  
  const [user, SetUser] = useState(null)
  const [form, SetForm] = useState('Register')
  const [username, SetUsername] = useState('')
  const [name, SetName] = useState('')
  const [password, SetPassword] = useState('')
  const [passwordagain, SetPasswordAgain] = useState('')
  const [message,SetMessage] = useState('')
  const [msg, Setmsg] = useState([])
 


  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    
    if (password === passwordagain) {

      try {

        const newUser  = {
          username: username,
          name: name,
          password: password,
        }
  
        userService
        .create(newUser)
        .then(returnedUser => {
          SetUsername('')
          SetName('')
          SetPassword('')
          SetPasswordAgain('')
          SetMessage(`created new user with the username: ${returnedUser.username}`)
          setTimeout(() => {
            SetMessage('')
          }, 5000)
        })
        .catch((error) => {
          Setmsg(error)
          setTimeout(() => {
            Setmsg([])
          }, 5000)
        })

      } catch (error){
        console.log(error)
      }


    } else {
      
      SetMessage('password does not match password again!')
      setTimeout(() => {
        SetMessage('')
      }, 5000)
      

    }
  }

  const handleLogin = async (event) => {
    
    try {
      loginService.login({
        username,password
      })
      .then(returnedUser => {
        SetUser(returnedUser)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(returnedUser)
        )
  
        itemService.setToken(returnedUser.token)
        SetUsername('')
        SetPassword('')
        SetForm('Account')

      })
      .catch((error) => {
        Setmsg(error)
        setTimeout(() => {
          Setmsg([])
        }, 5000)
      })

    } catch (error) {
      SetMessage('wrong username or password')
      setTimeout(() => {
        SetMessage('')
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    SetForm('Login')
    SetUser(null)
  }

  useEffect (() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      SetUser(user)
      itemService.setToken(user.token)
      SetForm('Account')
    }
  },[])

  return (
    <div>
      
     {
       form === 'Login' ? <LoginForm SetForm = {SetForm} username = {username} SetUsername= {SetUsername} password={password} 
       SetPassword= {SetPassword} handleLogin = {handleLogin} message={message} msg = {msg}/> : null
     }

     {
       form === 'Register' ? <RegisterForm SetForm = {SetForm} username= {username} SetUsername = {SetUsername} name = {name} SetName = {SetName}
       password = {password} SetPassword = {SetPassword} passwordagain = {passwordagain} SetPasswordAgain= {SetPasswordAgain}  handleRegisterSubmit = {handleRegisterSubmit}
       message= {message} SetMessage = {SetMessage} msg = {msg} Setmsg = {Setmsg}
      />:null
     }

     {
       form === 'Account' ? <AccountForm user = {user} handleLogOut = {handleLogOut} /> : null
     }
     
    </div>
  );
}

export default App;
