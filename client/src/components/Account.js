import React, {useState} from 'react'
//import itemService from  '../services/items'
import Item from './Item'


const Account = ({user, handleLogOut, item, SetItem, enlistItem, items, SetItems}) => {
  const [showCreate, SetShowCreate] = useState(false)
  const [showOwned, SetShowOwned] = useState(false)
  const [message, SetMessage] = useState('')
  const NewItemForm =() => {
    return (
      <div>
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
        <button onClick = {() => SetShowCreate(!showCreate)}>Cancel</button>
      </div>
      </div>
    )
  }



  const Display = () => {
    if (showOwned === true){
      if (items.filter(product => product.user._id === user.user._id).length > 0){
        return items.filter(product => product.user._id === user.user._id).map(product => <Item key = {product._id} product = {product} user = {user.user} message = {message} SetMessage = {SetMessage}/>)
      }else {
        return <h3>No owned items!</h3>
      }
      
    } else {
      if (items.filter(product => product.user._id !== user.user._id).length > 0){
        return items.filter(product => product.user._id !== user.user._id).map(product => <Item key = {product._id} product = {product} user = {user.user} message = {message} SetMessage = {SetMessage}/>)
      } else {
        return <h3>The are no items in this shop yet.</h3>
      }
      
    }

  }

  return(
    <div>
      <h1>Welcome to mirai commerce Mr./Mrs. {user.user.name}  </h1>
      <button onClick = {handleLogOut}>Logout</button>
      {
        showCreate ? NewItemForm() : <button onClick = {() => SetShowCreate(!showCreate)}>Enlist Item</button>
      }
      {
        showOwned ? <button onClick = {() => SetShowOwned(!showOwned)}>Items in shop</button> : <button onClick = {() => SetShowOwned(!showOwned)}>Owned Items</button>
      }
   
      
      <div className = 'info'>
        <h3>{message}</h3>
        <div className = 'products'>
          
          <Display/>
          
        </div>
        <div className = 'account-info'>
     
            <div>Name: {user.user.name}</div>
            <div>Username:{user.user.username}</div>
            <div>Balance: {user.user.balance}</div>
          
        </div>
      </div>
      
      
    </div>
  )
}


export default Account