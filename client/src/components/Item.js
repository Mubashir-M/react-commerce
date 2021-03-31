import React from 'react'
import itemService from '../services/items'

const Item = ({product, user, SetUser ,message , SetMessage, SetShowOwned, items ,SetItems}) => {
  
  const handlePurchase = (event) => {
    event.preventDefault()
    const product_id = event.target.value

    const updatedItem = {
      id: product_id,
      itemName: product.itemName,
      description: product.description,
      price: product.price,
      status: 'Owned',
      user: user._id
    }
    
    try {
      itemService
    .update(updatedItem)
    .then(returnedItem => {
      SetMessage(`Purchased ${returnedItem.itemName} successffully.`)
      const newItems= items.filter(product => product._id !== returnedItem._id )
      SetItems(newItems)
      console.log('returneditem:', returnedItem)
      console.log('example of items',items[0])
      setTimeout(() => {
        SetMessage('')
      }, 5000)
    })
    .catch((error) => {
      
      SetMessage('Account balance too low for transaction!')
      setTimeout(() => {
        SetMessage('')
      }, 5000)
    })
    } catch (error) {
      console.log(error)
    }

    


  }

  const handleSell = (event) => {
    event.preventDefault(
      console.log(event.target.value)
    )
  }

  const ListItems = () => {
    switch(product.user._id !== user._id){
      case true:
        return (
          <div>
            <div>{product.itemName}</div>
            <div>{product.description}</div>
            <div>{product.price}</div>
            <div>{product.status}</div>
            <button className = 'buy-button' onClick = {handlePurchase} value = {product._id}>Buy</button>
          </div>
        )
      case false:
          if (product.status === 'Owned'){
            return (
              <div>
                <div>{product.itemName}</div>
                <div>{product.description}</div>
                <div>{product.price}</div>
                <div>{product.status}</div>
                <button className = 'buy-button' onClick = {handleSell} value = {product._id}>Sell</button>
              </div>
            )
          } else {
            return (
              <div>
                <div>{product.itemName}</div>
                <div>{product.description}</div>
                <div>{product.price}</div>
                <div>{product.status}</div>
              </div>
            )
          }
      default:
        return null
    }
  }

  return (
    <div className = 'product'>
      <ListItems/>
    </div>
  )
}


export default Item