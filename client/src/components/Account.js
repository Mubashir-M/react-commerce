import React from 'react'


const Account = ({user, handleLogOut, item, SetItem, enlistItem}) => {
  return(
    <div>
      <h1>Welcome to mirai commerce Mr./Mrs. {user.name}  </h1> 
      <div className = 'form'>
        <div className = 'form-group'>
          <label>Item Name: </label>
          <input type = "text" name= 'itemName' placeholder='Item Name' value= {item.itemName}
            onChange = { event => SetItem( { ...item , itemName: event.target.value})}
          ></input>
        </div>
        <div className = 'form-group'>
          <label>Price: </label>
          <input type = "text" name= 'price' placeholder='Price' value= {item.price}
            onChange = { event => SetItem( { ...item, price: event.target.value})}
          ></input>
        </div>
        <div className = 'form-group'>
          <label>Description: </label>
          <input type = "text" name= 'description' placeholder='Description' value= {item.description}
            onChange = { event => SetItem( { ...item, description: event.target.value})}
          ></input>
        </div>
      </div>
      <div className = 'footer'>
        <button className = 'button' onClick = {enlistItem}>Enlist Item</button>
        <button onClick = {handleLogOut}>Logout</button>
      </div>

    </div>
  )
}


export default Account