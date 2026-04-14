import React from 'react'
import { useCart } from '../auth/CartContext'

function CartPage() {
    const {cart,updateCart,removeFromCart} = useCart()

    if(!cart.items.length === 0){
         <div className="min-h-screen flex items-center justify-center mt-48">
        <p className="text-gray-500 text-lg">🛒 Your Cart Is Empty</p>
      </div>
    }
  return (
    <div>CartPage</div>
  )
}

export default CartPage