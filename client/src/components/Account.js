import React from 'react'


const Account = ({user, handleLogOut}) => {
  return(
    <div>
      <h1>Welcome to mirai commerce</h1>{user.username}
      <button onClick = {handleLogOut}>Logout</button>
    </div>
  )
}


export default Account