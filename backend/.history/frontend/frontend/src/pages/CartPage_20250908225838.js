import React from 'react'
import { useCart } from '../auth/CartContext'

function CartPage() {
    const {cart,updateCart,removeFromCart} = useCart()
  return (
    <div>CartPage</div>
  )
}

export default CartPage