import React, {useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect }from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import AccountForm from './components/Account'
import userService from './services/user'
import loginService from './services/login'
import itemService from './services/items'



function App() {
  
  const [user, SetUser] = useState(null)
  const [login, SetLogin] = useState({ username: '', password:''})
  const [register, SetRegister] = useState({ username:'', name:'', password:'', passwordagain:''})
  const [message,SetMessage] = useState('')
  const [msg, Setmsg] = useState([])
  const [item, SetItem] = useState({ itemName: '', price:'', description: ''})
  const [items, SetItems] = useState([])
  const [showCreate, SetShowCreate] = useState(false)
  const [showOwned, SetShowOwned] = useState(false)
 


  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    
    if (register.password === register.passwordagain) {

      try {

        const newUser  = {
          username: register.username,
          name: register.name,
          password: register.password,
        }
  
        userService
        .create(newUser)
        .then(returnedUser => {
          SetRegister({ username:'', name:'', password:'', passwordagain:''})
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
    const loginUsername = login.username
    const loginPassword = login.password
    console.log('here are user and pasword', loginUsername, loginPassword)
    try {
      loginService.login({
        loginUsername,loginPassword
      })
      .then(returnedUser => {
        SetUser(returnedUser)
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(returnedUser)
        )
  
        itemService.setToken(returnedUser.token)
        SetLogin({ username: '', password:''})

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
    SetUser(null)
  }


  const enlistItem = (event) => {
    event.preventDefault()

      const newItem = {
        itemName: item.itemName,
        price: item.price,
        description: item.description,
        user: user
      }

      itemService
      .create(newItem)
      .then(returnedItem => {
        SetItem({ itemName: '', price:'', description: ''})
        console.log('before items addition:', items)
        const updateItems = items.concat(returnedItem)
        SetItems(updateItems)
        SetShowCreate(!showCreate)
        SetShowOwned(true)
      })

      itemService
      .getAll()
      .then(response => {
        SetItems(response)
      })
      console.log('after items addition:', items)
  }

  useEffect (() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      SetUser(user)
      userService
      .get(user.user._id)
      .then(returnedUser => {
        SetUser({...user, user: returnedUser})
      })
      itemService.setToken(user.token)

      itemService
      .getAll()
      .then(response => {
        SetItems(response)
      })

    }
  },[])

  return (
    <Router>
      <div className = 'App'>
        <Nav/>
        <Switch>
        <Route path='/' exact>
          {
            user ? < Redirect to = '/Account'/>
            : <Home/>
          }
        </Route>
        <Route path='/Login'>
          { user ? < Redirect to = '/Account'/>
            : <LoginForm login = {login} SetLogin = {SetLogin} handleLogin = {handleLogin} message={message} msg = {msg}/>
          }
        </Route>
        <Route path='/Register'>
          {
            user ? < Redirect to = '/Account'/>
            : <RegisterForm  register = {register} SetRegister= {SetRegister} handleRegisterSubmit = {handleRegisterSubmit}
                message= {message} SetMessage = {SetMessage} msg = {msg} Setmsg = {Setmsg}
              />
          }
          
        </Route>
        <Route path = '/Account'>
          { user ? <AccountForm user = {user} SetUser= {SetUser} handleLogOut = {handleLogOut} item = {item} SetItem= {SetItem} enlistItem = {enlistItem} items = {items}
              SetItems = {SetItems} showCreate = {showCreate} SetShowCreate={SetShowCreate} showOwned = {showOwned} SetShowOwned = {SetShowOwned}
            />
            : < Redirect to = '/Login'/>
          }
          
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
